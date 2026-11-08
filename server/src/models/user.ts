import { Schema, model, type HydratedDocument, type InferSchemaType } from 'mongoose'

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
)

export type UserDocument = HydratedDocument<InferSchemaType<typeof userSchema>>

// Allowlist instead of deleting fields in toJSON, so a new schema field never leaks by default
export function toPublicUser(user: UserDocument) {
  return { id: user.id as string, email: user.email, createdAt: user.createdAt }
}

const User = model('User', userSchema)

export default User
