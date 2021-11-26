import { validationResult, checkSchema } from 'express-validator'
import { v1 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import config from '../configs/authorization'

import RefreshTokens from '../models/refresh_tokens'
import Users from '../models/users'
import Planners from '../models/planners'
import Subscribes from '../models/subscribes'

const generateToken = async (userID) => {
  const refreshToken = uuid()

  await RefreshTokens.create({
    userID,
    value: refreshToken,
  })

  const accessToken = await jwt.sign(
    { userID },
    config.token.access.secret,
    { expiresIn: `${config.token.access.time}m` },
  )

  return {
    access: accessToken,
    refresh: refreshToken,
  }
}

export default (router) => {
  router.post(
    '/signIn',
    checkSchema({
      username: {
        in: 'body',
        errorMessage: 'Username is not correct',
        isString: true,
        toLowerCase: true,
        trim: true,
        notEmpty: true,
      },
      password: {
        in: 'body',
        notEmpty: {
          errorMessage: 'Password is not correct',
        },
      },
    }),
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

      const { username, password } = req.body
      try {
        const { _id: userID, password: passwordHash } = await Users.findOne({ username })
        const passwordIsCorrectly = await bcrypt.compare(password, passwordHash)

        if (!passwordIsCorrectly) {
          errors.push({
            msg: 'Password is incorrect',
            param: 'password',
            location: 'body',
          })

          return res.json({ errors })
        }

        const result = await generateToken(userID)
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
    '/signUp',
    checkSchema({
      email: {
        in: 'body',
        isEmail: true,
        errorMessage: 'Email is not correct',
      },
      password: {
        in: 'body',
        notEmpty: {
          errorMessage: 'Password is not correctly',
        },
        isLength: {
          errorMessage: `Password should be at least ${config.password.minLength} chars long`,
          options: { min: config.password.minLength },
        },
      },
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

      const { username, email, password } = req.body
      try {
        const userExist = await Users.findOne({ username })
        const emailExist = await Users.findOne({ email })

        if (userExist) {
          errors.push({
            msg: 'Username is unavailable',
            param: 'username',
            location: 'body',
          })

          return res.json({ errors })
        }
        if (emailExist) {
          errors.push({
            msg: 'Email is unavailable',
            param: 'email',
            location: 'body',
          })

          return res.json({ errors })
        }

        const passwordHash = await bcrypt.hash(password, config.password.hashSize)

        const { _id: userID } = await Users.create({
          username,
          email,
          password: passwordHash,
        })

        const creatingPlanner = await Planners.create([
          { userID, listName: 'plan', list: [] },
          { userID, listName: 'watching', list: [] },
          { userID, listName: 'onHold', list: [] },
          { userID, listName: 'dropped', list: [] },
          { userID, listName: 'completed', list: [] },
        ])

        if (!creatingPlanner) {
          errors.push({
            msg: 'Can`t create planner',
            param: '',
            location: 'body',
          })
          return res.json({ errors })
        }

        const creatingSubscribes = await Subscribes.create({ userID, list: [] })
        if (!creatingSubscribes) {
          errors.push({
            msg: 'Can`t create subcribes list',
            param: '',
            location: 'body',
          })
          return res.json({ errors })
        }

        const result = await generateToken(userID)
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
    '/logOut',
    checkSchema({
      // userID: {
      //   in: 'body',
      //   errorMessage: 'userID is not correct',
      //   notEmpty: true,
      // },
      token: {
        in: 'body',
        notEmpty: {
          errorMessage: 'Token is not correct',
        },
      },
    }),
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

      const { token } = req.body
      try {
        // const userExist = await Users.findById(userID)
        // if (!userExist) {
        //   errors.push({
        //     msg: 'User doesn`t exist',
        //     param: 'userID',
        //     location: 'body',
        //   })

        //   return res.json({ errors })
        // }

        const deactivate = await RefreshTokens
          .findOne({ value: token, status: 'ACTIVE' })
          .updateOne({ status: 'WITHDRAWN' })
        if (deactivate.length) {
          errors.push({
            msg: 'Token is not valid',
            param: 'token',
            location: 'body',
          })

          return res.json({ errors })
        }

        const result = 'success'
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
    '/refresh',
    checkSchema({
      token: {
        in: 'body',
        notEmpty: {
          errorMessage: 'Token is not correct',
        },
      },
    }),
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

      const { token } = req.body
      try {
        const { userID } = await RefreshTokens.findOne({ value: token })
        if (!userID) {
          errors.push({
            msg: 'Token is not valid',
            param: 'token',
            location: 'body',
          })

          return res.json({ errors })
        }

        const deactivate = await RefreshTokens
          .findOne({ value: token, status: 'ACTIVE' })
          .updateOne({ status: 'USED', date_of_used: Date.now() })

        if (deactivate.length) {
          errors.push({
            msg: 'Token is not valid',
            param: 'token',
            location: 'body',
          })

          return res.json({ errors })
        }

        const result = await generateToken(userID)
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
