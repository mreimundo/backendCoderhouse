const express = require('express')
const handlebars = require('express-handlebars')
const apiRoutes = require('./routers/appRouters')
const viewsRoutes = require('./routers/views/viewsRouter')
const path = require('path')
const { Server } = require ('socket.io')

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/statics', express.static(path.resolve(__dirname, '../public')))
app.use('/api', apiRoutes)
app.use('/', viewsRoutes)


const httpServer = app.listen(PORT, ()=>{
    console.log('Funcionando en puerto => ', PORT)
})

const socketServer = new Server(httpServer) 

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado")
    app.set('socket', socket)
    socket.on('message', data => console.log(data))
    
    /*socket.emit('mensaje_solo_para_este', 'Comunicación solo para el socket')
    socket.broadcast.emit('mensaje_para_todos_menos_este', 'Comunicación para todos menos el actual')
    socketServer.emit('mensaje_para_todos', 'Este evento lo reciben todos los sockets conectados')*/
})