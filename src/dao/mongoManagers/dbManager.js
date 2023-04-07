const mongoose = require('mongoose')
const dbConfig = require('../../config/dbConfig')
const { logRed, logCyan } = require('../../utils/consoleUtils')

class DatabaseManager {
    static #instance = false
    constructor(){
        mongoose.set('strictQuery', false)
        mongoose.connect(dbConfig.mongo.uri, error => {
            if(error){
                logRed(`db connection failed: ${error}`)
                throw error
            }
            logCyan('connected to db')
        })
    }

    static connect(){
        if(!this.#instance){
            this.#instance = new DatabaseManager()
        }
        return this.#instance
    }
}

module.exports = DatabaseManager