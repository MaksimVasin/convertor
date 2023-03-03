const {Image, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require('fs')

class ImageUserController {
  
  async createUserImage(req, res, next) {
    try {
      const { userId } = req.params
      const { filename, dataSVG, dataPNG } = req.body

      //////////////////////////////////////////////////////////////////////////////////////////////////
      // Возможно лучше проверять на фронте повторное сохранение, а не каждый раз за N искать картинку
      const existingImage = await Image.findOne({ where: {dataSVG} })
      if (existingImage) return next(ApiError.badRequest('Такая картинка уже есть'))
      //////////////////////////////////////////////////////////////////////////////////////////////////

      const image = await Image.create({ filename, dataSVG, dataPNG })

      const user = await User.findByPk(userId)

      if (!user) return next(ApiError.badRequest('Пользователь не найден'))

      await user.addImage(image)

      res.json({
        message: `Изображение ${image.id} связано с пользователем ${userId}`,
      });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getUserImages(req, res, next) {
    try {
      console.log(req.params.userId)
      const user = await User.findByPk(req.params.userId)
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'))
      }
  
      const userImages = await user.getImages()
      return res.json(userImages)
    } catch (err) {
      return next(ApiError.internal(err.message))
    }
  }

  async deleteUserImage(req, res, next) {
    try {
      const { userId, imageId } = req.params;
      const user = await User.findByPk(userId)
      const image = await Image.findByPk(imageId)
  
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }
  
      if (!image) {
        return next(ApiError.badRequest('Изображение не найдено'));
      }

      fs.unlink(`${process.env.ROOT_PATH}/../client/public${image.dataPNG}`, (err) => {
        if (err) {
          console.log(err)
          return
        }
      })
      fs.unlink(`${process.env.ROOT_PATH}/../client/public${image.dataSVG}`, (err) => {
        if (err) {
          console.log(err)
          return
        }
      })
  
      await user.removeImage(image)
      await image.destroy()

  
      return res.sendStatus(204);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

}

module.exports = new ImageUserController()