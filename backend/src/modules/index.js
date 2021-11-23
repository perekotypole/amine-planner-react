import { Router } from 'express'

const router = Router()

export default (app) => {
  app.use('/', router)
}
