import { Schema, model } from 'mongoose'

export default model('User', new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mainPhoto: {
    type: String,
    default: () => null,
  },
  banner: {
    type: String,
    default: () => null,
  },
  status: {
    type: String,
    default: () => null,
  },
}))
