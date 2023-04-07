const chatModel = require('../models/chatModel')
const { logYellow } = require('../../utils/consoleUtils')

class ChatManagerMDB {
    
    async getAll() {
        const messages = await chatModel.find().lean()
        return messages
    }

    async add(newMessage) {
        const message = await chatModel.create(newMessage)
        return message
    }

    async delete(mid) {
        const cleanChat = await chatModel.deleteOne({_id: mid})
        logYellow(`message deleted`)
        return cleanChat  
    }

    async deleteAll() {
        const cleanChat = await chatModel.deleteMany()
        logYellow(`chat cleaned`)
        return cleanChat  
    }
}

module.exports = ChatManagerMDB