const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')

router.post('/create', imageController.createImage) // создание нового изображения
router.get('/all', imageController.allImages)
router.get('/:id', imageController.getImage)
router.put('/:id', imageController.updateImage)
router.delete('/:id', imageController.deleteImage)

//router.get('/:id/user') // получение информации о пользователе, которому принадлежит конкретное изображение
//router.put('/:id/images/:id') // связывание изображения с пользователем
//router.delete('/:id/images/:id') //  удаление связи между пользователем и изображением

module.exports = router