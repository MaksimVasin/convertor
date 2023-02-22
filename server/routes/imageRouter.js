const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')

router.post('/create', imageController.createImage) // создание нового изображения
router.get('/all', imageController.allImages)
router.get('/:id', imageController.getImage)
router.put('/:id', imageController.updateImage)
router.delete('/:id', imageController.deleteImage)

module.exports = router