/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;*/

var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    db = require( './db' ),
    tests = require( './tests' ),
    //url = 'mongodb://localhost:27017/techassesment',
    url = 'mongodb://saravanan86:knight1!@ds017246.mlab.com:17246/techassesment',
    app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://techaptitude.website.tk');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

//App router
app.use(allowCrossDomain);
app.use( express.static( 'public' ) );
app.use('/tests', tests);

// Monogo DB connection and Server start up

db.connect( url , function(err) {

  if ( err ) {

    console.log('Unable to connect to Mongo.', err);
    process.exit(1);

  } else {
    
    app.listen(process.env.PORT || 3000, function() {

      console.log('Listening on port 3000...');

    });

  }

});




function getJson(){
//['Java','.Net','Oracle', 'JavaScript', 'Html5', 'NodeJs', 'ActionScript', 'Objective C', 'Php', 'MongoDb', 'AngularJs', 'Android', 'XML', 'MySql','SqlServer','C#','Selenium', 'Testing', 'Shell Script', 'Linux', 'C++', 'C']
  var tests = ['Java','.Net','Oracle', 'JavaScript', 'Html5', 'NodeJs', 'ActionScript', 'Objective C', 'Php', 'MongoDb', 'AngularJs', 'Android', 'XML', 'MySql','SqlServer','C#','Selenium', 'Testing', 'Shell Script', 'Linux', 'C++', 'C'],
      template = {
        index:0,
        topic: "",
        title: "",
        level:0,
        questions:[]
      },
      finalJson = [],
      index = 0;

  for( var i = 0, len = tests.length; i < len; i++ ){

    var test = tests[i];

    for( var j = 0; j < 3; j++ ) {

      var data = {};

      data.index = index++;
      data.topic = test.replace(/ /g,'').toLowerCase();
      data.title = test;
      data.level = j;
      data.questions = [];
      for( var k = 0; k < 50; k++ ){

        data.questions[k] = {
          'question' : 'This is a sample question number '+(k+1)+' for test with title '+test,
          'choices'  : ['Option 1','Option 2', 'Option 3', 'Option 4'],
          'answer'   : 0
        };

      }
      finalJson.push(data);
    }

  }

  return finalJson;

}