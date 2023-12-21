const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 5000;

app.use(cors());

// Serve static files (you may adjust this based on your needs)
app.use(express.static('public'));

// Start WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // You can emit initial data here if needed

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
