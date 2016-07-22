var express = require('express');
var skipper = require('skipper');
var mongoose = require('mongoose');
var morgan = require('morgan');
var passport = require('passport');
var colors = require('colors');
var path = require('path');

//configure Mongoose

 mongoose.connect('mongodb://localhost/CashFlo')

 mongoose.connection.on('connected', function () {
 	console.log('Data Base Connected...'.green)
 })

 mongoose.connection.on('error', function () {
	console.log('Data Base Connection Failed'.red)
 })

//require('./config/passport')

//configure Express

var app = express();

//set up statics
app.use(express.static(__dirname + '/dist'))

app.use(morgan('dev'));
//app.use(passport.initialize());
app.use(skipper());


app.use('/money', require('./server/money/routes'));
app.use('/users', require('./server/users/routes'));

app.get('*', function (req, res)
{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(9050, function () {
	console.log('Listening on localhost:9050');
});
