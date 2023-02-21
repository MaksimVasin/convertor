const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const {User} = require('../models/models') // + набор картинок
const {png2svg} = require('svg-png-converter')
const { readFileSync } = require('node:fs')
const fs = require('fs')
const path = require('path')

class ConvertController {

  async testUpload(req, res, next) {
    const fileName = `${req.file.originalname}`;
    fs.rename(req.file.path, `${process.env.ROOT_PATH}/../images/original/${fileName}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка при сохранении файла!');
      } else {
        res.send(`Файл ${fileName} успешно загружен!`);
      }
    });
  }

  async testConvert(req, res, next) {
    let {name} = req.body

    const svgString = await png2svg({ 
      tracer: 'imagetracer',
      //tracer: 'potrace',

      optimize: true,
      input: readFileSync(`${process.env.ROOT_PATH}/../images/original/${name}`),
      numberofcolors: 24,
      pathomit: 1,
    })

    const { name: fileName, ext } = path.parse(name) 
    const newFileName = `${fileName}.svg`
    const filePath = path.join(process.env.ROOT_PATH, `../images/svg/${newFileName}`)
    fs.writeFile(filePath, svgString.content, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Файл успешно записан!');
      }
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Disposition', `attachment; filename="${newFileName}"`);
    return res.send(svgString.content)
  }

}

module.exports = new ConvertController()