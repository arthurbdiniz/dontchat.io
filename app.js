var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();

var index = require('./routes/index');
var chat = require('./routes/chat');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/:chatCode', chat);

module.exports = app;