const Router = require('express')
const imageUserController = require('../controllers/imageUserController')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration) // Регистарция (создание) пользователя
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.auth)

router.get('/all', userController.getAllUsers) // Получение всех пользователей
router.get('/:userId', userController.getUserByID) // Получение конкретного пользователя по ID
router.put('/:userId', userController.update) // test // Обновление информации о пользователе по ID
router.delete('/:userId', userController.delete) // test // Удаление пользователя по ID

router.get('/:userId/images', imageUserController.getUserImages) // получение списка изображений, принадлежащих конкретному пользователю
router.post('/:userId/createImage', imageUserController.createUserImage) // создание изображения и привязка к пользователю
router.delete('/:userId/images/:imageId', imageUserController.deleteUserImage) // удаление изображения и его связи

module.exports = router