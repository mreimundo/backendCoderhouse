const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    PORT : process.env.PORT || 8080,
    MONGO_URL: process.env.MONGO_URL || '',
    DATABASE : process.env.DATABASE,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    DATA_SOURCE : process.env.DATA_SOURCE || '',
    SECRET_KEY: process.env.SECRET_KEY || '',
    SESSION_KEY: process.env.SESSION_KEY || ''
}