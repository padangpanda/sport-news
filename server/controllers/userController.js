const {OAuth2Client} = require('google-auth-library');
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

  static loginG (req,res,next) {
    const { id_token } = req.body
    let email = null
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      email = payload.email

      return User.findOne({
        where: {
          email
        }
      })
    })
    .then(user => {
      if(!user) {
        return User.create({
          email,
          password: Math.random()*1000+'ini random'
        })
      } else {
        return user
      }
    })
    .then(user => {
      const payload = {
        id: user.id,
        email: user.email
      }
      const access_token = generateToken(payload)
      return res.status(200).json({
        access_token
      })
    })
    .catch(err =>{
      next(err)
    })
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
    }
}

module.exports = UserController
