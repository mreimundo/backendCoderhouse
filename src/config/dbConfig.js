/*const mongoose = require('mongoose')
const { logRed, logCyan } = require('../utils/consoleUtils')
const options = require('./options')

mongoose.set('strictQuery', false)
mongoose.connect(options.mongoDb.url, (error) => {
    if(error){
        return logRed(`db connection failed: ${error}`)
    }
    logCyan('connected to db');
})
*/

const {MONGO_URL, DATABASE, DATABASE_PASSWORD} = require('./enviroment.config')

const DB_CONFIG = {
    mongo: {
        uri: MONGO_URL.replace('<password>', DATABASE_PASSWORD).replace('<database>', DATABASE)
    }
}

module.exports = DB_CONFIG 