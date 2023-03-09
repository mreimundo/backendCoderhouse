const mongoose = require('mongoose')
const { logRed, logCyan } = require('../utils/consoleUtils')
const options = require('./options')

mongoose.set('strictQuery', false)
mongoose.connect(options.mongoDb.url, (error) => {
    if(error){
        return logRed(`db connection failed: ${error}`)
    }
    logCyan('connected to db');
})