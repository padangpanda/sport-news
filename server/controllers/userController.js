const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await User.create({email, password})
      const response = {
        id: data.id,
        email: data.email
      }
      return res.status(201).json(response)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const data = await User.findOne({
        where: {
          email
        }
      })
      if(!data) {
        throw {name: 'invalidEmailPassword'}
      }
      const match = comparePassword(password, data.password)
      if (match ) {
        const payload = {
          id: data.id,
          email: data.email
        }
        const access_token = generateToken(payload)
        return res.status(200).json({
          access_token
        })
      } else {
        throw {name: 'invalidEmailPassword'}
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
