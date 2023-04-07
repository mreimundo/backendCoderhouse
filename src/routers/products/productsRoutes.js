const { Router } = require('express')
const uploader = require('../../utils/multerUtils')
const ProductsController = require('../../controllers/productsController')
const { adminMiddleware } = require('../../middlewares/roleMiddleware.js')
const passportCall = require('../../middlewares/passportMiddleware.js')

const router = Router()

router.get('/', ProductsController.getAll)
router.get('/:pid', ProductsController.getById)
router.post('/', passportCall('jwt'), adminMiddleware, uploader.array('files'), ProductsController.addProduct)
router.put('/:pid', passportCall('jwt'), adminMiddleware, ProductsController.updateProduct)
router.delete('/:pid', passportCall('jwt'), adminMiddleware, ProductsController.deleteProduct)

module.exports = router