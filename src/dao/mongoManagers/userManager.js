const { logCyan } = require('../../utils/consoleUtils')
const userModel = require('../models/userModel')

class UserManagerMDB {
    async getAll() {
        const users = await userModel.find()
        return users
    }

    async getById(id){
        const user = await userModel.findById(id).lean()
        return user
    }

    async getByEmail(email){
        const user = await userModel.findOne({email: email}).lean()
        return user
    }

    async addUser(payload){
        const newUser = await userModel.create(payload)
        logCyan('New user created')
        return newUser
    }

    async updateUser(id, payload){
        const updatedUser = await userModel.findByIdAndUpdate((id, payload, { new: true }))
        logCyan('User updated')
        return updatedUser
    }

    async deleteUser(id) {
        const deletedUser = await userModel.findByIdAndDelete(id);
        return deletedUser;
    }
}

module.exports = UserManagerMDB