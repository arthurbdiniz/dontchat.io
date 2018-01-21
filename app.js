// packages
var express = require('express');
var path = require('path');

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
app.use('/:chatCode', chat);

var server = app.listen(app.get('port'), function () {
    console.log(`Listening on port ${app.get('port')}`);
});