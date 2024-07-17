const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Web3 = require('web3');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to Sui Network
const web3 = new Web3('https://sui-network-url'); // Update with the actual Sui network URL
const contractAddress = '0xYourContractAddress'; // Update with your contract address
const contractABI = [ /* ABI JSON here */ ]; // Update with your contract ABI

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Endpoint to fetch data from Sui Network
app.get('/api/data', async (req, res) => {
    try {
        const data = await contract.methods.yourMethod().call(); // Replace 'yourMethod' with your contract method
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Simple root endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// WebSocket connection and event handling
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
