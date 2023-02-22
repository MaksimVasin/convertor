const Router = require('express')
const router = new Router()
const imageController = require('../controllers/imageController')

router.post('/create') // создание нового изображения
router.get('/all')
router.get('/:id')
router.put('/:id')
router.delete('/:id')

module.exports = router