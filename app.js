var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expensetracker');

//simple middleware
var logger = function(req, res, next) {
	next();
}

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'jade');
app.use(logger);
app.use(bodyParser.json());

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
