var express = require('express');
var routerUser = require('./routes/user.route');
var db = require('./db');

var app = express();
var port = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// pug
app.set('views', './views');
app.set('view engine', 'pug');

//static file images, css, js,...
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name: 'Coders X'
	});
});

//users
app.use('/users', routerUser)

app.listen(port, function() {
	console.log('Server runing listening port ' +port);
});