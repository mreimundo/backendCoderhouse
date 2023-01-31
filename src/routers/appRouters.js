const { Router } = require('express')
const productsRoutes = require('./products/productsRoutes')
const cartRoutes = require('./carts/cartsRoutes')
const chatRoutes = require('./chat/chatRoutes')

const router = Router()

router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)
router.use('/chat', chatRoutes)

module.exports = router