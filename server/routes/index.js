const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter.js')
const typeRouter = require('./typeRouter.js')

router.use('/user', userRouter)
router.use('/type', typeRouter)

module.exports = router