import { validationResult, checkSchema } from 'express-validator'

import Users from '../models/users'
import Subscribes from '../models/subscribes'

export default (router) => {
  router.post(
    '/subscribes/add',
    checkSchema({
      movieID: {
        in: 'body',
      },
    }),
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

      const { userID } = req.user
      const { movieID } = req.body
      try {
        const userExist = await Users.findById(userID)
        if (!userExist) {
          errors.push({
            msg: 'User doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        const itemExist = await Subscribes.findOne({
          userID,
          list: {
            $elemMatch: { movieID },
          },
        })
        if (itemExist) {
          errors.push({
            msg: 'item exist in list',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        await Subscribes.findOne({ userID })
          .updateOne({ $push: { list: { movieID } } })

        const result = await Subscribes.findOne({ userID })
        return res.json({ result })
      } catch {
        errors.push({
          msg: 'Something wrong',
          param: '',
          location: 'body',
        })

        return res.json({ errors })
      }
    },
  )

  router.post(
    '/subscribes/get',
    async (req, res) => {
      const errors = []

      const { userID } = req.user
      try {
        const userExist = await Users.findById(userID)
        if (!userExist) {
          errors.push({
            msg: 'User doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        const data = await Subscribes.findOne({ userID })
        const result = {
          userID: data.userID,
          list: data.list.sort((a, b) => new Date(b.date) - new Date(a.date)),
        }

        return res.json({ result })
      } catch {
        errors.push({
          msg: 'Something wrong',
          param: '',
          location: 'body',
        })

        return res.json({ errors })
      }
    },
  )

  router.post(
    '/subscribes/delete',
    checkSchema({
      movieID: {
        in: 'body',
        errorMessage: 'movieID is not correct',
        notEmpty: true,
      },
    }),
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

      const { userID } = req.user
      const {
        movieID,
      } = req.body
      try {
        const userExist = await Users.findById(userID)
        if (!userExist) {
          errors.push({
            msg: 'User doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        const itemExist = await Subscribes.findOne({
          userID,
          list: {
            $elemMatch: { movieID },
          },
        })
        if (!itemExist) {
          errors.push({
            msg: 'item doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        await Subscribes.findOne({ userID })
          .updateOne({ $pull: { list: { movieID } } })

        const result = await Subscribes.findOne({ userID })
        return res.json({ result })
      } catch {
        errors.push({
          msg: 'Something wrong',
          param: '',
          location: 'body',
        })

        return res.json({ errors })
      }
    },
  )
}
