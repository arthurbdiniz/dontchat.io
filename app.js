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
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', 3000);

// routes setup
app.use('/', index);
app.use('/:chatPath', chat, registerNamespace);

var server = app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});

// socket connection
var io = socketIO(server);

// registered namespaces
let namespaces = {};

// namespace handling
function registerNamespace(req, res) {
    let namespace = `/${req.params.chatPath}`;
    if (namespace in namespaces) {
        return;
    }

    console.log(`Registering ${namespace}`);
    namespaces[namespace] = io.of(namespace);
    activateNamespace(namespaces[namespace]);
}

function activateNamespace(nsp) {
    nsp.on('connection', function (socket) {
        console.log(`ID CONNECTED ${socket.id}`);

        socket.on('chat-send', function (data) {
            console.log(`Received data from ${data.nickname} on ${data.room}`);
            console.log(data);
            nsp.emit('chat-receive', data);
        });
    });
    console.log(`Activated ${nsp.name}`);
}

// server export
module.exports = app;
