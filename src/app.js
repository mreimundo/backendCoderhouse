const express = require('express')
const apiRoutes = require('./routers/appRouters.js')
const path = require('path')
const handlebars = require('express-handlebars')
const viewsRoutes = require('./routers/views/viewsRouter.js')
const { Server } = require('socket.io')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const initializePassport = require('./config/passportConfig.js')
require('./config/dbConfig')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.use(session({
    name: 'session',
    secret: 'top-secret',
    cookie: {
        maxAge: 60000 * 60,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:admin@ecommerce.ua2jv9s.mongodb.net/?retryWrites=true&w=majority",
        ttl: 3600
    })
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', apiRoutes)
app.use('/', viewsRoutes)

app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');

const httpServer = app.listen(PORT, ()=>{
    console.log('Corriendo en el puerto => ', PORT)
})

const io = new Server(httpServer)

io.on('connection', (socket)=>{
    console.log("Nuevo cliente conectado");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('Bienvenido ', user)
        socket.broadcast.emit('Nuevo usuario ', user)
    })
})