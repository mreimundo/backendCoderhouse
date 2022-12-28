import express from 'express'
import cartsRoutes from './routes/cartsRoutes.js';
import productsRoutes from './routes/productsRoutes.js';

const app = express()
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.listen(8080, () => console.log("Server OK! Listening PORT 8080"))
app.use('/api/products/', productsRoutes)
app.use('/api/carts/', cartsRoutes)
app.use(express.static('public'))
app.use(cookieParser())
