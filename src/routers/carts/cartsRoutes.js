const { Router } = require('express')
const CartManager = require('../../dao/fsManagers/CartManager')
const CartManagerMDB = require('../../dao/mongoManagers/cartManager')

const router = Router()

const cartManager = new CartManager('./carts.json')
const cartManagerMDB = new CartManagerMDB()

router.get('/',async (req, res) =>{
    try {
        const cart = await cartManagerMDB.getCarts() 
        res.send({
            status: 'success',
            carts: cart
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.get('/:cid',async (req, res) =>{
    const id = req.params.cid
    try {
        const cart = await cartManagerMDB.getCartById(id) 
        res.send({
            status: 'success',
            cart: cart
        })  
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post('/:cid/product/:pid', async(req,res)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const addProduct = await cartManagerMDB.addProduct(cartId, productId)
        res.send({
            status: 'success',
            newCart: addProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post('/', async(req, res)=>{
    const addCart = await cartManagerMDB.addCart()
    res.send({
        status: 'success',
        cart: addCart
    })
})

module.exports = router