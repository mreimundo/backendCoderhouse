const { Router } = require('express')
const productsRoutes = require('./products/productsRoutes.js')
const cartRoutes = require('./carts/cartsRoutes.js')
const chatRoutes = require('./chat/chatRoutes.js')
const sessionRoutes = require('./session/sessionRoutes.js')
const userRoutes = require('./users/usersRoutes.js')
const errorMiddleware = require('../middlewares/errorMiddleware.js')

const router = Router()

router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)
router.use('/chat', chatRoutes)
router.use('/session', sessionRoutes)
router.use('/users', userRoutes)
router.use(errorMiddleware)

module.exports = router