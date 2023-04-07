const { Router } = require('express')
const uploader = require('../../utils/multerUtils')
const UsersController = require('../../controllers/usersController')

const router = Router()

router.get('/', UsersController.getAll)
router.get('/:uid', UsersController.getById)
router.post('/', uploader.single('file'), UsersController.addUser)
router.put('/:uid', UsersController.updateUser)
router.delete('/:uid', UsersController.deleteUser)

module.exports = router