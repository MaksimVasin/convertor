const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter.js')
const typeRouter = require('./typeRouter.js')
const convertRouter = require('./converRouter.js')

router.use('/user', userRouter)
router.use('/type', typeRouter)

router.use('/convert', convertRouter)

module.exports = router