import { Schema, model } from 'mongoose'

export default model('Subscribe', new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'PASSED', 'NONTERM'],
    default: 'ACTIVE',
  },
}))
