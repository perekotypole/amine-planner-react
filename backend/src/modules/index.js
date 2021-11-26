import { Router } from 'express'

import verifyUser from '../middlewares/verifyUser'

import authorization from './authorization'
import planners from './planners'
import users from './users'
import subscribes from './subscribes'

const router = Router()
authorization(router)

router.use(verifyUser)
users(router)
planners(router)
subscribes(router)

export default (app) => {
  app.use('/', router)
}
