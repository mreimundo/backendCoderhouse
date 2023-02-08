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
        const addProduct = await cartManagerMDB.addProductToCart(cartId, productId)
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

router.put('/:cid', async (req, res) =>{
    const { cid } = req.params
    const newProducts = req.body
    try {
        const updatedCart = await cartManagerMDB.updateProducts(cid, newProducts)
        res.send({
            status: 'success',
            payload: updatedCart
        })
        
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.put('/:cid/product/:pid', async(req,res)=>{
    const {cid, pid} = req.params
    const amount = req.body.quantity
    try {
        if(!amount){
            throw new Error('an amount of product must be provided')
        }
        const updateProduct = await cartManagerMDB.addProductToCart(cid, pid, amount)
        res.send({
            status: 'success',
            payload: updateProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.delete('/:cid/product/:pid', async(req,res)=>{
    try {
        const {cid, pid} = req.params
        const deletedProduct = await cartManagerMDB.deleteProductFromCart(cid, pid)
        res.send({
            status: 'success',
            newCart: deletedProduct
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.delete('/:cid', async(req,res)=>{
    try {
        const { cid }= req.params
        const result = await cartManagerMDB.deleteAllProducts(cid)
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

module.exports = router