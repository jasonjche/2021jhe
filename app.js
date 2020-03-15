#!/usr/bin/nodejs
// -------------- load packages -------------- //
var express = require('express');
var app = express();
var hbs = require('hbs');
var https = require('https');
var morgan = require('morgan');
var controllers = require('./controllers');

// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 12475);
app.use(express.static('static'));
app.use(morgan('short'));

//tell express that the view engine is hbs
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

controllers.do_setup(app);
// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), () => {
    console.log('Express server started on port: ' + listener.address().port);
});