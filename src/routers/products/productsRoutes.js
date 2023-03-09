const { Router } = require('express')
const uploader = require('../../utils/multerUtils')
const ProductsController = require('../../controllers/productsController')

const router = Router()

router.get('/', ProductsController.getAll)
router.get('/:pid', ProductsController.getById)
router.post('/', uploader.array('files'), ProductsController.addProduct)
router.put('/:pid', ProductsController.updateProduct)
router.delete('/:pid', ProductsController.deleteProduct)

module.exports = router