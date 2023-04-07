const { Router } = require('express')
const CartsController = require('../../controllers/cartsController.js')
const passportCall = require('../../middlewares/passportMiddleware.js')
const { userMiddleware } = require('../../middlewares/roleMiddleware.js')

const router = Router()

router.get('/', CartsController.getAll)
router.get('/:cid', CartsController.getById)
router.post('/', CartsController.addCart)
router.put('/:cid/product/:pid', passportCall('jwt'), userMiddleware, CartsController.addProduct)
router.put('/:cid/purchase', passportCall('jwt'), userMiddleware, CartsController.purchase)
router.delete('/:cid/product/:pid', CartsController.removeProduct)
router.delete('/:cid', CartsController.clearCart)


module.exports = router