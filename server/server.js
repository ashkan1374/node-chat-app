const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected !");

    socket.emit('newMessage', generateMessage('Admin',
        'welcome to the chat app !'));

    socket.broadcast.emit('newMessage', generateMessage('Admin',
        'new user joined'));


    socket.on('createMessage', (message, callback) => {
        console.log('createMessage :', message);
        io.emit('newMessage', generateMessage(
            message.from,
            message.text
        ));
        callback();

        //socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage',
            generateLocationMessage('Admin', coords.latitude ,coords.longitude));
    });


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});

if (!module.parent) {
    server.listen(port, () => {
        console.log(`Server is running on port ${port} !`);
    });
}