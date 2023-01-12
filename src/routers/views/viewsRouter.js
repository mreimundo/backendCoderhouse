const { Router } = require('express')
const uploader = require('../../utils')
const ProductManager = require('../../managers/ProductManager')

const router = Router()

const productManager = new ProductManager('./products.json')

router.get('/', async (req, res)=>{
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit){
        return res.render('home',{
            products: products,
            style: 'home.css',
            title: 'Products'
        })
    }
    const limitedProducts = products.slice(0,limit)
    res.render('home',{
        products: limitedProducts,
        style: 'home.css',
        title: 'Products'
    })
})

router.get('/updatedproducts', async (req, res)=>{
    const products = await productManager.getProducts()
    const limit = req.query.limit
    if(!limit){
        return res.render('updatedProducts',{
            products: products,
            style: 'home.css',
            title: 'Updated Products'
        })
    }
    const limitedProducts = products.slice(0,limit)
    res.render('updatedProducts',{
        products: limitedProducts,
        style: 'home.css',
        title: 'Updated Products'
    })
})

router.post('/updatedproducts', uploader.array('files'), async (req, res)=>{
    const newProduct = req.body
    const socket = req.app.get('socket')
    if(!newProduct){
        return res.status(400).send({
            error: 'missing product'
        })
    }
    if(req.files){
        const paths = req.files.map(file => {
            return {path: file.path,
             originalName: file.originalname    
            }
        })
        newProduct.thumbnails = paths
    }
    socket.emit('newProduct', newProduct)
    res.send({
        status: 'success'
    })
})

module.exports = router