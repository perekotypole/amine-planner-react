import { validationResult, checkSchema } from 'express-validator'

import Users from '../models/users'

export default (router) => {
  router.post(
    '/user/update',
    checkSchema({
      username: {
        in: 'body',
        errorMessage: 'Username is not correct',
        isString: true,
        toLowerCase: true,
        trim: true,
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
        username,
        status,
        mainPhoto,
        banner,
      } = req.body

      try {
        const user = await Users.findById(userID)

        if (!user) {
          errors.push({
            msg: 'User doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        const result = await Users.findById(userID)
          .updateOne({
            // eslint-disable-next-line no-underscore-dangle
            ...user._doc,
            username,
            status,
            mainPhoto,
            banner,
          })
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
