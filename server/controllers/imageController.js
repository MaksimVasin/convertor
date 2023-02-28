const {Image} = require('../models/models')
const ApiError = require('../error/ApiError');

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
    try {
      const imageId = req.params.id;
      const image = await Image.findOne({ where: { id: imageId } });
      if (!image) {
        return next(ApiError.badRequest(`Изображение с ID ${imageId} не найдено`));
      }
      await image.destroy();
      res.status(204).end();
    } catch (err) {
      return next(ApiError.internal(err.message));
    }
  }

}

module.exports = new ImageController()