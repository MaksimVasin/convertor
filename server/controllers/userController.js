const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models') // + набор картинок

const generateJwt = (id, login, email, role) => {
  return jwt.sign(
    {id, login, email, role}, 
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {

  async registration(req, res) {
    const {login, email, password, role} = req.body
    if (!email || !login || !password) { // Сделать норм валидацию
      return next(ApiError.badRequest('Некорретный ввод'))
    }
    
    const user = await User.findOne({where: {email}}) // + login!
    if (user) {
      return next(ApiError.badRequest('Пользователь с таким email уже сущетсвует'))
    }

    const hashPassword = await bcrypt.hash(password, 5)
    const newUser = await User.create({login, email, role, password: hashPassword})
    //

    const token = generateJwt(newUser.id, newUser.login, newUser.email, newUser.role);

    return res.json({token})
  }

  async login(req, res, next) {
    const {email, password} = req.body
    const user = await User.findOne({where: {email}})
    if (!user) {
      return next(ApiError.internal("Пользователь с такой почтой не найден"))
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'))
    }
    const token = generateJwt(user.id, user.login, user.email, user.role)
    return res.json({token})
  }

  async auth(req, res, next) {
    const token = generateJwt(req.user.id, req.user.login, req.user.email, req.user.role);
    return res.json({token})
    /*const {id} = req.query
    if (!id) {
      return next(ApiError.badRequest('айди походу нет D:'))
    }
    res.json(id)*/
  }

}

module.exports = new UserController()