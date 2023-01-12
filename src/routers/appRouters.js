const { Router } = require('express')
const productsRoutes = require('./products/productsRoutes')
const cartRoutes = require('./carts/cartsRoutes')

const router = Router()

router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)

module.exports = router