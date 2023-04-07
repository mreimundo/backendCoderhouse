const enviroment = require('./enviroment.config')


const options = {
    fileSystem:{
        productsFileName: "products.json"
    },
    mongoDb:{
        url: enviroment.MONGO_URL
    }
}

module.exports = options