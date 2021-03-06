require('dotenv').config();

var express = require('express');

var cookieParser =  require('cookie-parser');

var db = require('./db');

var routerAuth = require('./routes/auth.route');
var routerUser = require('./routes/user.route');
var routerProduct = require('./routes/product.route');
var routeCart = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var app = express();
var port = 3000;

//body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// cookie
app.use(cookieParser(process.env.SECRET_COOKIE));

app.use(sessionMiddleware);

// pug
app.set('views', './views');
app.set('view engine', 'pug');

//static file images, css, js,...
app.use(express.static('public'));

app.get('/', function(req, res) {
	var userId = req.signedCookies.userId;
	var user = db.get('users').find({id:userId}).value();

	res.render('index', {
		name: 'Coders X',
		user: user
	});
});

//auth
app.use("/auth", routerAuth);

//users
app.use('/users', authMiddleware.requireAuth, routerUser);

//products
app.use('/products', routerProduct)

//cart
app.use('/cart', routeCart);




app.listen(port, function() {
	console.log('Server runing listening port ' +port);
});