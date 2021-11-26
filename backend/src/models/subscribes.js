import { Schema, model } from 'mongoose'

export default model('Subscribes', new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  list: [{
    movieID: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: () => new Date(),
    },
  }],
}), 'subscribes')
