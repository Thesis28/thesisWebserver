var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
//var routes = require('./routes/index');
var users = require('./routes/users');
var index = require('./routes/index');

var app = express();
/*
global.con = mysql.createConnection({
  host: "localhost",
  user: "thesisUser",
  password: "thesisSQLpw",
  database: "thesisdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "TRUNCATE TABLE thesistable";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}); 
*/

// Global variable setup (not ideal but used for functional testing)
global.speedbar = 0;
global.turnbar = 0;
global.LED = 0;
global.power = 0;
global.newCommand = 0;
global.servos = "155026265247150";
global.commandID = 0;
global.lastCommand = 1;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('port', (8888));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// Setup Routes
var arduinoComm = require('./routes/arduinoComm');
var androidComm = require('./routes/androidComm');

app.use ('/arduino', arduinoComm);
app.use ('/android', androidComm);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
