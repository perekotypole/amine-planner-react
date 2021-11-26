import { Schema, model } from 'mongoose'

export default model('RefreshToken', new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  value: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'USED', 'NONTERM', 'WITHDRAWN'],
    default: () => 'ACTIVE',
  },
  date_of_used: {
    type: Date,
  },
}))
