const {Image} = require('../models/models')
const ApiError = require('../error/ApiError');
const fs = require('fs')

class ImageController {
  
  async createImage(req, res, next) {
    try {
      const { filename, dataSVG, dataPNG } = req.body
      const image = await Image.create({ filename, dataPNG, dataSVG })
      res.json(image)
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async allImages(req, res, next) {
    try {
      const images = await Image.findAll();
      return res.json(images);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async getImage(req, res, next) {
    try {
      const id = req.params.id;
      const image = await Image.findByPk(id);
      if (!image) {
        return next(ApiError.badRequest(`Изображение с ID ${id} не найдено`));
      }
      return res.json(image);
    } catch (err) {
      next(err);
    }
  }

  async updateImage(req, res, next) {
    try {
      const { id } = req.params;
      const { filename, dataSVG, dataPNG } = req.body;
  
      const image = await Image.findByPk(id);
  
      if (!image) {
        return next(ApiError.badRequest(`Изображение с ID ${id} не найдено`));
      }
  
      image.filename = filename || image.filename;
      image.dataSVG = dataSVG || image.dataSVG;
      image.dataPNG = dataPNG || image.dataPNG;
      await image.save();
  
      res.json(image);
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

  async deleteImage(req, res, next) {
    console.log('Попал в контроллер удаления')
    try {
      const { dataSVG, dataPNG } = req.body;
      console.log('Прилетело на беке')
      console.log(dataPNG, dataSVG)

      fs.unlink(`${process.env.ROOT_PATH}/../client/public${dataPNG}`, (err) => {
        if (err) {
          console.log(err)
          return
        }
      })

      fs.unlink(`${process.env.ROOT_PATH}/../client/public${dataSVG}`, (err) => {
        if (err) {
          console.log(err)
          return
        }
      })
      res.status(204).end()
    } catch (err) {
      return next(ApiError.internal(err.message))
    }
  }

}

module.exports = new ImageController()