import { Schema, model } from 'mongoose'

export default model('Subscribe', new Schema({
  userID: {
    type: Number,
    required: true,
    unique: true,
  },
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
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
}))
