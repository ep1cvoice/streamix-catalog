import { Router } from 'express'
import { z } from 'zod'
import ListItem, {
  CONTENT_TYPES,
  LIST_NAMES,
  MEDIA_TYPES,
  mediaTypeOf,
  toClientItem,
} from '../models/listItem.js'
import { requireAuth, authedUserId } from '../middleware/requireAuth.js'

// Only an https URL or empty: these end up in <img src> on the client
const imageUrl = z.string().max(500).refine(s => s === '' || s.startsWith('https://'), 'must be an https URL')

// Mirrors the frontend ContentItem; unknown keys (cast, trailer, ...) are stripped
const itemSchema = z.object({
  id: z.number().int().positive(),
  type: z.enum(CONTENT_TYPES),
  title: z.string().trim().min(1).max(300),
  year: z.number().int().min(0).max(3000),
  rating: z.number().min(0).max(10),
  genre: z.array(z.string().max(50)).max(20).default([]),
  poster: imageUrl.default(''),
  description: z.string().max(5000).default(''),
  language: z.string().max(10).default(''),
  hero: imageUrl.optional(),
  objectPosition: z.string().max(50).optional(),
})

type Item = z.infer<typeof itemSchema>

const listParams = z.object({ list: z.enum(LIST_NAMES) })
const itemParams = listParams.extend({
  mediaType: z.enum(MEDIA_TYPES),
  tmdbId: z.coerce.number().int().positive(),
})

const IMPORT_LIMIT = 500
const importSchema = z.object({
  favorites: z.array(z.unknown()).max(IMPORT_LIMIT).default([]),
  'watch-later': z.array(z.unknown()).max(IMPORT_LIMIT).default([]),
})

function snapshotOf({ id, ...snapshot }: Item): Omit<Item, 'id'> {
  return snapshot
}

const listsRouter = Router()
listsRouter.use(requireAuth)

listsRouter.get('/:list', async (req, res) => {
  const { list } = listParams.parse(req.params)
  const docs = await ListItem.find({ user: authedUserId(req), list }).sort({ addedAt: 1 })
  res.json(docs.map(toClientItem))
})

// Idempotent add: re-adding keeps the original addedAt (and position) and refreshes the snapshot
listsRouter.put('/:list/:mediaType/:tmdbId', async (req, res) => {
  const { list, mediaType, tmdbId } = itemParams.parse(req.params)
  const item = itemSchema.parse(req.body)
  if (item.id !== tmdbId || mediaTypeOf(item.type) !== mediaType) {
    res.status(400).json({ error: 'item does not match the URL' })
    return
  }

  const doc = await ListItem.findOneAndUpdate(
    { user: authedUserId(req), list, mediaType, tmdbId },
    { $set: { item: snapshotOf(item) } },
    { upsert: true, returnDocument: 'after', runValidators: true },
  )
  res.json(toClientItem(doc))
})

listsRouter.delete('/:list/:mediaType/:tmdbId', async (req, res) => {
  const { list, mediaType, tmdbId } = itemParams.parse(req.params)
  await ListItem.deleteOne({ user: authedUserId(req), list, mediaType, tmdbId })
  res.status(204).end()
})

// One-time move of the old localStorage lists into the account. Never overwrites what is
// already stored; stale or malformed entries are skipped instead of failing the whole import.
listsRouter.post('/import', async (req, res) => {
  const user = authedUserId(req)
  const body = importSchema.parse(req.body)
  const now = Date.now()
  let skipped = 0

  const ops = LIST_NAMES.flatMap(list => {
    const seen = new Set<string>()
    const items = body[list].flatMap(raw => {
      const parsed = itemSchema.safeParse(raw)
      const key = parsed.success ? `${parsed.data.type}:${parsed.data.id}` : ''
      if (!parsed.success || seen.has(key)) {
        skipped++
        return []
      }
      seen.add(key)
      return [parsed.data]
    })

    return items.map((item, index) => ({
      updateOne: {
        filter: { user, list, mediaType: mediaTypeOf(item.type), tmdbId: item.id },
        // Spaced 1ms apart so the old localStorage order survives the addedAt sort
        update: { $setOnInsert: { item: snapshotOf(item), addedAt: new Date(now - (items.length - index)) } },
        upsert: true,
      },
    }))
  })

  const result = ops.length > 0 ? await ListItem.bulkWrite(ops, { ordered: false }) : null
  res.json({ imported: result?.upsertedCount ?? 0, skipped })
})

export default listsRouter
