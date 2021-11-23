import express from 'express'
import cors from 'cors'

import database from './database'
import modules from './modules'

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use(cors())

database
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

modules(app)
app.listen(port)
