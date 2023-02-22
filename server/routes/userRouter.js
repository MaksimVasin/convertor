const Router = require('express')
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

module.exports = router