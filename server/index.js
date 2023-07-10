const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const EVENTS = {
  send_message: 'send_message',
  receive_message: 'receive_message',
  join_room: 'join_room'
}

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5005',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id} `);

  socket.on(EVENTS.join_room, data => {
    socket.join(data.room);
    console.log('data room ', data)
  })

  socket.on(EVENTS.send_message, data => {
    // socket.emit(EVENTS.receive_message, data);
    // console.log('dreceiveData ', data)
    socket.to(data.room).emit(EVENTS.receive_message, data);
    // socket.broadcast.emit(EVENTS.receive_message, data);
    console.log('data message ', data)
  });

  // socket.on('counter_updated', () => {
  //   count++
  // })
});

server.listen(5555, () => {
  console.log('SERVER IS RUNNING');
})
