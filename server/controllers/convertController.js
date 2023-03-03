const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
//const {User} = require('../models/models') // + набор картинок
const {png2svg} = require('svg-png-converter')
const { readFileSync } = require('node:fs')
const fs = require('fs')
const path = require('path')

class ConvertController {

  async upload(req, res, next) {
    const fileName = req.file.originalname
    //const userName = req.userName
    const date = new Date()
    const newFileName = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}_${fileName}`
    fs.rename(req.file.path, `${process.env.ROOT_PATH}/../client/public/images/original/${newFileName}`, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Произошла ошибка при сохранении файла!');
      } else {
        return res.send("/images/original/" + newFileName);
      }
    });
  }

  async convert(req, res, next) {
    let {name} = req.body

    const svgString = await png2svg({ 
      tracer: 'imagetracer',
      //tracer: 'potrace',

      optimize: true,
      input: readFileSync(`${process.env.ROOT_PATH}/../client/public${name}`),
      numberofcolors: 24,
      pathomit: 1,
    })

    const { name: fileName, ext } = path.parse(name) 
    const newFileName = `${fileName}.svg`
    const filePath = path.join(process.env.ROOT_PATH, `../client/public/images/svg/${newFileName}`)
    fs.writeFile(filePath, svgString.content, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Файл успешно записан!');
      }
    });
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Content-Disposition', `attachment; filename="${newFileName}"`);
    //console.log('PATH '+filePath)
    return res.send("/images/svg/" + newFileName)
  }

}

module.exports = new ConvertController()