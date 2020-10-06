const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const { setegid } = require('process');


//connect database
const url = process.env.DATABASE_URI;
mongoose
    .connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then((db) => console.log('Connected Successfully to Database!'));

mongoose.connection.on('error', (err) => {
    console.log('DB connection error:' + err);
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
	name: 'session-id',
	secret: '12345-67890-09876-54321',
	saveUninitialized: false,
	resave: false,
	store: new FileStore()
}));

// route wichc don't need autherization
app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req, res, next) {
	console.log(req.session);

	if (!req.session.user) {

		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');                        
		err.status = 401;
		return next(err);
	}
	else {
		if (req.session.user === 'authenticated') {
			// console.log('req.session: ',req.session);
			next();
		}
		else {
			var err = new Error('You are not authenticated!');
			err.status = 403;
			next(err);
		}
	}
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

// ristricted routes, need autherization
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
