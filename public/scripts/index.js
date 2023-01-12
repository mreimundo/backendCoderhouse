const socket = io()
socket.emit('message', 'Comunicación emitida desde websocket') //Para solo el socket

//Escuchar eventos del servidor:
/*
socket.on('mensaje_solo_para_este', data => console.log(data))
socket.on('mensaje_para_todos_menos_este', data => console.log(data))
socket.on('mensaje_para_todos', data => console.log(data))*/