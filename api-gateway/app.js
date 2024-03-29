var createError   = require('http-errors');
var express       = require('express');
var path          = require('path');
var cookieParser  = require('cookie-parser');
var logger        = require('morgan');
var indexRouter   = require('./routes/index');
var apiCatalog    = require('./routes/api-catalog');
var bodyParser = require('body-parser');

// Database connection
var mongoose      = require('mongoose');
mongoose.Promise  = require('bluebird');
var mongoDB = 'mongodb+srv://admin:Zzxcvbnm@buwebdev-cluster-1-3umfh.mongodb.net/test';
mongoose.connect(mongoDB, { promiseLibrary: require('bluebird') })
  .then(  ()    => console.log('Successful database connection.') )
  .catch( (err) => console.error(err) );
// End Database connection

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/api', apiCatalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Found nothing. Try again.'));
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
