let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();



// MongoDB Configuration
let mongoose = require('mongoose');
let db = require('./db');
// point mongoose to database URI
mongoose.connect(db.URI)
// Display MongoDB connection status
let mongDB = mongoose.connection;
mongDB.on('error', console.error.bind(console, 'Connection error: '));
mongDB.once('open', ()=> {
  console.log('Connected to MongoDB.');
})

// Set-up Express Session
app.use(session({
  secret:"SomeSecret", 
  saveUninitialized:false,
  resave:false
}))

// initalize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// create a user model instance
let userModel = require('../models/user');
let User = userModel.User;

// implement a User Authentication
passport.use(User.createStrategy());

// serialize and deserialize the user info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let reservationRouter = require('../routes/reservations');


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use('/', indexRouter);
app.use('/home', indexRouter);
app.use('/logout', indexRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
