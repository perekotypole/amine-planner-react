import { Schema, model } from 'mongoose'

export default model('Planner', new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  listName: {
    type: String,
    required: true,
  },
  list: [{
    movieID: {
      type: Number,
      default: () => null,
    },
    title: {
      type: String,
      default: () => null,
    },
  }],
}))
