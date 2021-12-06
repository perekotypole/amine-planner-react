import { validationResult, checkSchema } from 'express-validator'
import { isValidObjectId } from 'mongoose'

import Users from '../models/users'
import Planners from '../models/planners'

export default (router) => {
  router.post(
    '/planner/add',
    checkSchema({
      listName: {
        in: 'body',
        errorMessage: 'listName is not correct',
        notEmpty: true,
      },
      movieID: {
        in: 'body',
      },
      movieTitle: {
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
      const {
        listName, movieID, movieTitle,
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

        const listExist = await Planners.findOne({ userID, listName })
        if (!listExist) {
          errors.push({
            msg: 'listName doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        if ((!movieID && !movieTitle)) {
          errors.push({
            msg: 'movieID or movieTitle is not correct',
            param: '[movieID, movieTitle]',
            location: 'body',
          })

          return res.json({ errors })
        }

        let item = {}
        if (movieID) item = { movieID }
        else item = { title: movieTitle }

        const itemExist = await Planners.findOne({
          userID,
          listName,
          list: {
            $elemMatch: item,
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

        let existInOtherList = null
        if (movieID) {
          existInOtherList = (await Planners.findOne({
            userID,
            list: {
              $elemMatch: { movieID },
            },
          }))?.listName

          if (existInOtherList) {
            await Planners.findOne({ userID, listName: existInOtherList })
              .updateOne({ $pull: { list: { movieID } } })
          }
        }

        await Planners.findOne({ userID, listName })
          .updateOne({ $push: { list: { movieID, title: movieTitle } } })

        const data = await Planners.findOne({ userID, listName })
        const result = {}
        result[listName] = data.list

        return res.json({ addTo: listName, removeFrom: existInOtherList })
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
    '/planner/changeList',
    checkSchema({
      listName: {
        in: 'body',
        errorMessage: 'listName is not correct',
        notEmpty: true,
      },
      list: {
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
      const {
        listName, list,
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

        const listExist = await Planners.findOne({ userID, listName })
        if (!listExist) {
          errors.push({
            msg: 'listName doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        await Planners.findOne({ userID, listName })
          .updateOne({ list })

        const data = await Planners.find({ userID })
        const result = data.reduce((o, cur) => ({ ...o, [cur.listName]: cur.list }), {})

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
    '/planner/getByList',
    checkSchema({
      listName: {
        in: 'body',
        errorMessage: 'listName is not correct',
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
      const { listName } = req.body
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

        const listExist = await Planners.findOne({ userID, listName })
        if (!listExist) {
          errors.push({
            msg: 'listName doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        const data = await Planners.findOne({ userID, listName })
        const result = {}
        result[listName] = data.list

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
    '/planner/get',
    async (req, res) => {
      const errors = []
      errors.push(...validationResult(req).array())

      if (errors.length) {
        return res.json({ errors })
      }

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

        const data = await Planners.find({ userID })
        const result = data.reduce((o, cur) => ({ ...o, [cur.listName]: cur.list }), {})

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
    '/planner/delete',
    checkSchema({
      listName: {
        in: 'body',
        errorMessage: 'listName is not correct',
        notEmpty: true,
      },
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
        listName, movieID,
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

        const listExist = await Planners.findOne({ userID, listName })
        if (!listExist) {
          errors.push({
            msg: 'listName doesn`t exist',
            param: 'userID',
            location: 'body',
          })

          return res.json({ errors })
        }

        let filter = {}
        if (isValidObjectId(movieID)) {
          filter = { _id: movieID }
        } else {
          filter = { movieID }
        }
        console.log(filter)

        const itemExist = await Planners.findOne({
          userID,
          listName,
          list: {
            $elemMatch: filter,
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

        const result = await Planners.findOne({ userID, listName })
          .updateOne({ $pull: { list: filter } })
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
