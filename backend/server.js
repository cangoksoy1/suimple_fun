
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Example of emitting new token event
  setInterval(() => {
    const token = {
      name: `Token ${Math.floor(Math.random() * 1000)}`,
      description: 'This is a new token',
    };
    io.emit('newToken', token);
  }, 5000);

  // Example of emitting notification event
  setInterval(() => {
    const notification = `User ${Math.floor(Math.random() * 1000)} bought a token`;
    io.emit('notification', notification);
  }, 7000);
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
