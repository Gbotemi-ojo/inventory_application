var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const homeRouter = require('./routes/home');

var app = express();

mongoose.set("strictQuery", false);
const dev_db_url = "mongodb+srv://Gbotemi:O9lnUB2jiQcUPdo2@cluster0.vndnniu.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;



main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const port = process.env.PORT || 4000
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home',homeRouter);




app.use(express.static('css'));

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
app.listen(port, ()=>{
  console.log(`listening on port ${port}`)
})
// "start": "nodemon ./bin/www"
module.exports = app;
