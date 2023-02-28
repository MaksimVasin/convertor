const {Image, User} = require('../models/models')
const ApiError = require('../error/ApiError');

class ImageUserController {
  
  async createUserImage(req, res, next) {
    try {
      const { userId } = req.params
      const { filename, dataSVG, dataPNG } = req.body
      console.log('___3. На бек прилетело ', dataSVG)
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

  async linkImageToUser(req, res, next) {
    try {
      const { userId, imageId } = req.params;

      console.log(userId, imageId)
  
      const user = await User.findByPk(userId);
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }
  
      const image = await Image.findByPk(imageId);
      if (!image) {
        return next(ApiError.badRequest('Изображение не найдено'));
      }
  
      await user.addImage(image);
  
      res.json({
        message: `Изображение ${imageId} связано с пользователем ${userId}`,
      });
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getUserImages(req, res, next) {
    try {
      const user = await User.findByPk(req.params.id)
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'))
      }
  
      const userImages = await user.getImages()
      console.log('___4. На беке получаю изображения', userImages)
      return res.json(userImages)
    } catch (err) {
      return next(ApiError.internal(err.message))
    }
  }

  async deleteImageToUser(req, res, next) {
    try {
      const { userId, imageId } = req.params;
      const user = await User.findByPk(userId);
      const image = await Image.findByPk(imageId);
  
      if (!user) {
        return next(ApiError.badRequest('Пользователь не найден'));
      }
  
      if (!image) {
        return next(ApiError.badRequest('Изображение не найдено'));
      }
  
      await user.removeImage(image);
  
      return res.sendStatus(204);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

}

module.exports = new ImageUserController()