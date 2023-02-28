const Router = require('express')
const imageUserController = require('../controllers/imageUserController')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) // Регистарция (создание) пользователя
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)

router.get('/all', userController.getAllUsers) // Получение всех пользователей
router.get('/:id', userController.getUserByID) // Получение конкретного пользователя по ID
router.put('/:id', userController.update) // test // Обновление информации о пользователе по ID
router.delete('/:id', userController.delete) // test // Удаление пользователя по ID

router.get('/:id/images', imageUserController.getUserImages) // получение списка изображений, принадлежащих конкретному пользователю
router.put('/:userId/images/:imageId', imageUserController.linkImageToUser) // связывание изображения с пользователем
router.post('/:userId/createImage', imageUserController.createUserImage) // ЗАМЕНА СОЗДАНИЮ ИЗОБРАЖЕНИЯ И ПРИВЯЗКИ К ПОЛЬЗОВАТЕЛЮ
router.delete('/:userId/images/:imageId', imageUserController.deleteImageToUser) // удаление связи между пользователем и изображением 

module.exports = router