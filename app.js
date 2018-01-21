// packages
var express = require('express');
var path = require('path');
var socketIO = require('socket.io');

// nested routes
var index = require('./routes/index');
var chat = require('./routes/chat');

// app setup
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/', index);
app.use('/:chatPath', chat);

var server = app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});

// socket connection
var io = socketIO(server);

// socket events
io.on('connection', function (socket) {
    console.log(`ID CONNECTED ${socket.id}`);

    socket.on('chat-send', function (data) {
        console.log(`Received data from ${data.nickname} on ${data.room}`);
        console.log(data);
        io.sockets.emit('chat-receive', data);
    });
});

io.on('disconnect', function (socket) {
    console.log(`Disconnected with id: ${socket.id}`);
});