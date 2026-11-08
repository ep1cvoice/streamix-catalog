import { Schema, model } from 'mongoose'

export const LIST_NAMES = ['favorites', 'watch-later'] as const
// TMDB ids are only unique per media type, so the type is part of the item key
export const MEDIA_TYPES = ['movie', 'tv'] as const
export const CONTENT_TYPES = ['movie', 'series', 'cartoon'] as const

export type ListName = (typeof LIST_NAMES)[number]
export type MediaType = (typeof MEDIA_TYPES)[number]
export type ContentType = (typeof CONTENT_TYPES)[number]

export function mediaTypeOf(type: ContentType): MediaType {
  return type === 'movie' ? 'movie' : 'tv'
}

// Card-level copy of the TMDB item, so list pages render without a TMDB call per entry.
// Details (cast, trailer, ...) are left out: MovieModal fetches them on open.
const snapshotSchema = new Schema(
  {
    type: { type: String, enum: CONTENT_TYPES, required: true },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, required: true },
    genre: { type: [String], default: [] },
    poster: { type: String, default: '' },
    description: { type: String, default: '' },
    language: { type: String, default: '' },
    hero: String,
    objectPosition: String,
  },
  { _id: false },
)

const listItemSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    list: { type: String, enum: LIST_NAMES, required: true },
    mediaType: { type: String, enum: MEDIA_TYPES, required: true },
    tmdbId: { type: Number, required: true },
    item: { type: snapshotSchema, required: true },
    // Explicit field rather than renamed timestamps, which break mongoose's type inference
    addedAt: { type: Date, default: Date.now, immutable: true },
  },
)

// One entry per title per list; also serves the (user, list) lookups
listItemSchema.index({ user: 1, list: 1, mediaType: 1, tmdbId: 1 }, { unique: true })

// Taken from the model: HydratedDocument<InferSchemaType> misses the nested subdocument typing
export type ListItemDocument = InstanceType<typeof ListItem>

// Shaped like the frontend's ContentItem, plus addedAt
export function toClientItem(doc: ListItemDocument) {
  const { item } = doc
  return {
    id: doc.tmdbId,
    type: item.type,
    title: item.title,
    year: item.year,
    rating: item.rating,
    genre: [...item.genre],
    poster: item.poster,
    description: item.description,
    language: item.language,
    ...(item.hero && { hero: item.hero }),
    ...(item.objectPosition && { objectPosition: item.objectPosition }),
    addedAt: doc.addedAt,
  }
}

const ListItem = model('ListItem', listItemSchema)

export default ListItem
