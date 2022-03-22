var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./controller/db')

var indexRouter = require('./routes/index');
var ragister = require('./routes/ragister');
var login = require('./routes/login');
var logout = require('./routes/logout');
var shample = require('./routes/shample');
var notice = require('./routes/notice');
var forgotpassword = require("./routes/forgot_password")

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/ragister', ragister)
app.use('/login', login)
app.use('/logout', logout)
app.use('/shample', shample)
app.use("/notice", notice)
app.use("/forgotpassword",forgotpassword)


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


//authentication.auth()


module.exports = app;