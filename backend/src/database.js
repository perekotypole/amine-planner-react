import mongoose from 'mongoose'
import { production, development } from './configs/db'

const dbData = process.env.NODE_ENV === 'production' ? production : development

const database = mongoose
  // .connect(`mongodb://${dbData.username}:${dbData.password}@${dbData.host}/${dbData.database}`, {
  .connect(`mongodb://${dbData.host}/${dbData.database}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

export default database
