const express = require('express')
const apiRoutes = require('./routers/appRouters.js')
const path = require('path')
const handlebars = require('express-handlebars')
const helpers = require('handlebars-helpers')
const viewsRoutes = require('./routers/views/viewsRouter.js')
const { Server } = require('socket.io')
const { logGreen, logRed } = require('./utils/consoleUtils')
const passport = require('passport')
const initializePassport = require('./config/passportConfig.js')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
require('./config/dbConfig')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.use(cookieParser())
initializePassport()
app.use(passport.initialize())
app.use(flash())

app.use('/api', apiRoutes)
app.use('/', viewsRoutes)


const math = helpers.math();
app.engine('handlebars', handlebars.engine({
    helpers: {
        math
    }
}))

app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'handlebars');

const server = app.listen(PORT, "127.0.0.1", () => {
    const host = server.address().address;
    const port = server.address().port;
    logGreen(`Server is up and running on http://${host}:${port}`);
});

server.on("error", (error) => {
    logRed("There was an error starting the server");
    console.log(error);
});


const io = new Server(server)

io.on('connection', (socket) => {
    console.log("Nuevo cliente conectado");
    app.set('socket', socket)
    app.set('io', io)
    socket.on('login', user =>{
        socket.emit('Bienvenido ', user)
        socket.broadcast.emit('Nuevo usuario ', user)
    })
})