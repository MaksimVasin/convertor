const {Image, User} = require('../models/models')
const ApiError = require('../error/ApiError')
const fs = require('fs')

class ImageUserController {
  
  async createUserImage(req, res, next) {
    try {
      const { userId } = req.params
      const { filename, dataSVG, dataPNG } = req.body

      const user = await User.findByPk(userId)
      if (!user) return next(ApiError.badRequest('Пользователь не найден'))
      const imagesIds = JSON.parse(user.imagesIds)

      const existingImage = await Image.findOne({where: {id: imagesIds, dataSVG}})
      if (existingImage) return next(ApiError.badRequest('Такая картинка уже есть'))

      let image = await Image.findOne({ where: { id: imagesIds, filename } })
      if (!image) {
        image = await Image.create({ filename, dataSVG, dataPNG, userId })
      }
      else {
        image = await Image.findOrCreate({ where: { id: imagesIds, filename } }).then(
          async ([image, created]) => {
            if (!created) {
              let count = 1
              let newFilename = filename + ` (${count})`
              while (true) {
                let foundImage = await Image.findOne({ where: { id: imagesIds, filename: newFilename } })
                if (foundImage) {
                  count++;
                  newFilename = filename + ` (${count})`
                } else break
              }
              return await Image.create({ filename: newFilename, dataSVG, dataPNG, userId })
            } else return image
          }
        )
      }

      imagesIds.push(image.id)
      user.imagesIds = JSON.stringify(imagesIds)
      await user.save()

      return res.json({
        id: image.id,
      });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getUserImages(req, res, next) {
    try {
      const user = await User.findByPk(req.params.userId)
      if (!user) return next(ApiError.badRequest('Пользователь не найден'))
      const imagesIds = JSON.parse(user.imagesIds)
      const images = await Image.findAll({where: {id: imagesIds}})
      return res.json(images)
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

      const imagesIds = JSON.parse(user.imagesIds).filter(imgId => imgId != imageId)
      user.imagesIds = JSON.stringify(imagesIds)
      await user.save()
      //await user.removeImage(image)  
      await image.destroy()

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
  
      return res.sendStatus(204);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

}

module.exports = new ImageUserController()