const { Router } = require('express')
const chatModel = require('../../dao/models/chatModel')
const ProductManagerMDB = require('../../dao/mongoManagers/productManager')
const CartManagerMDB = require('../../dao/mongoManagers/cartManager')
const { sessionMiddleware } = require('../../middlewares/sessionMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const passportCall = require('../../middlewares/passportMiddleware')


const productMDBService = new ProductManagerMDB()
const cartMDBService = new CartManagerMDB()
const router = Router()

router.get('/', (req,res) => {
    res.redirect('/login')
})

router.get('/signup', sessionMiddleware, (req,res) => {
    res.render('signup', {
        title: 'Registro',
        styles: 'signup.css'
    })
})

router.get('/login', sessionMiddleware, (req, res)=>{
    res.render('login', {
        title: 'Inicio de sesión',
        styles: 'login.css'
    })
})

router.get('/products', authMiddleware, passportCall('jwt'), async (req, res) => {
    const user = req.session.user
    try {
        const products = await productMDBService.getProducts(req.query)
        res.render('index', {
            title: "E-commerce",
            styles:"index.css",
            products: products.docs,
            user: user
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/cart/:cid', authMiddleware, passportCall('jwt'), async (req, res) => {
    const cartId = req.params.cid
    const user = req.user
    try {
        const cart = await cartMDBService.getCartById(cartId)
        res.render('cart', {
            title: "Cart",
            styles:"cart.css",
            user,
            cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/chat', authMiddleware, passportCall('jwt'), async (req,res)=>{
    const messages = await chatModel.find().lean()
    res.render('chat', {
        title: "Meta new chat!",
        styles:"chat.css",
        messages})
})



module.exports = router