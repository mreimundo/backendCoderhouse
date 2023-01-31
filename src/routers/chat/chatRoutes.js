const { Router } = require('express')
const chatModel = require('../../dao/models/chatModel')

const router = Router()

router.get('/', async (req,res)=>{
    const messages = await chatModel.find().lean()
    res.render('chat', {
        title: "Meta new chat!",
        styles:"chat.css",
        messages})
})

router.post('/', async (req,res)=>{
    const io = req.app.get('io')
    const newMessage = req.body
    await chatModel.create(newMessage)
    io.emit('newMessage', newMessage)
})

router.delete('/', async (req,res)=>{
    await chatModel.deleteMany()
    const io = req.app.get('io')
    io.emit('cleanChat', {})
})


module.exports = router

