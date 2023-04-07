const { Router } = require('express')
const ViewsController = require('../../controllers/viewsController')
const { sessionMiddleware } = require('../../middlewares/sessionMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const passportCall = require('../../middlewares/passportMiddleware')


const router = Router()

router.get('/', (req,res) => {
    res.redirect('/login')
})

router.get('/signup', sessionMiddleware, ViewsController.signup)

router.get('/login', sessionMiddleware, ViewsController.login)

router.get('/products', authMiddleware, passportCall('jwt'), ViewsController.products)

router.get('/cart/:cid', authMiddleware, passportCall('jwt'), ViewsController.cart)

router.get('/chat', authMiddleware, passportCall('jwt'), ViewsController.chat)

router.get('/ticket/:tid', authMiddleware, passportCall('jwt'), ViewsController.ticket)


module.exports = router