const { Router } = require('express')
const ChatController = require('../../controllers/chatController')
const { userMiddleware } = require('../../middlewares/roleMiddleware.js')
const passportCall = require('../../middlewares/passportMiddleware.js')

const router = Router()

router.get('/', ChatController.getAll)
router.post('/', passportCall('jwt'), userMiddleware, ChatController.addMessage)
router.delete('/:mid', ChatController.deleteMessage)
router.delete('/', ChatController.deleteAllMessages)

module.exports = router