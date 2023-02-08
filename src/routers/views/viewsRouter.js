const { Router } = require('express')
const chatModel = require('../../dao/models/chatModel')
const productModel = require('../../dao/models/productModel')
const ProductManagerMDB = require('../../dao/mongoManagers/productManager')
const CartManagerMDB = require('../../dao/mongoManagers/cartManager')

const productMDBService = new ProductManagerMDB()
const cartMDBService = new CartManagerMDB()
const router = Router()

router.get('/', async (req, res) => {
    const products = await productModel.find().lean()
    res.render('index', {
        title: "E-commerce",
        styles:"index.css",
        products
    })
})

router.get('/products', async (req, res) => {
    try {
        const products = await productMDBService.getProducts(req.query)
        res.render('index', {
            title: "E-commerce",
            styles:"index.css",
            products: products.docs
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/cart/:cid', async (req, res) => {
    const cartId = req.params.cid 
    try {
        const cart = await cartMDBService.getCartById(cartId)
        res.render('cart', {
            title: "Cart",
            styles:"cart.css",
            products: cart.products,
            cartId: cart._id
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/chat', async (req,res)=>{
    const messages = await chatModel.find().lean()
    res.render('chat', {
        title: "Meta new chat!",
        styles:"chat.css",
        messages})
})



module.exports = router