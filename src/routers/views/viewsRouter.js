const { Router } = require('express')
const chatModel = require('../../dao/models/chatModel')
const productModel = require('../../dao/models/productModel')

const router = Router()

router.get('/', async (req, res) => {
    const products = await productModel.find().lean()
    res.render('index', {
        title: "E-commerce",
        styles:"index.css",
        products
    })
})

router.get('/chat', async (req,res)=>{
    const messages = await chatModel.find().lean()
    res.render('chat', {
        title: "Meta new chat!",
        styles:"chat.css",
        messages})
})



module.exports = router