const { DATA_SOURCE } = require("../../config/enviroment.config");
const { logCyan } = require('../../utils/consoleUtils');
const DatabaseManager = require("../mongoManagers/dbManager");

let cartsDao, chatsDao, productsDao, usersDao, ticketsDao

logCyan(`Using ${DATA_SOURCE} as persistence method`)

switch(DATA_SOURCE){

    case "FILE": {
        const CartManager = require('../fsManagers/cartManager')
        const ProductManager = require('../fsManagers/productManager')
        cartsDao = new CartManager()
        productsDao = new ProductManager()
        break;
    }

    case "MONGO": {
        DatabaseManager.connect()
        const CartManagerMDB = require('../mongoManagers/cartManager')
        const { ProductManagerMDB } = require('../mongoManagers/productManager')
        const ChatManagerMDB = require('../mongoManagers/chatManager')
        const UserManagerMDB = require('../mongoManagers/userManager')
        const { TicketManagerMDB } = require("../mongoManagers/ticketManager");
        cartsDao = new CartManagerMDB()
        productsDao = new ProductManagerMDB()
        chatsDao = new ChatManagerMDB()
        usersDao = new UserManagerMDB()
        ticketsDao = new TicketManagerMDB()
        break;
    }

    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

const getDaos = () => {
    return {
        cartsDao,
        productsDao, 
        chatsDao,
        usersDao,
        ticketsDao
    }
}

module.exports = getDaos