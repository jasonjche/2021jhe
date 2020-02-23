#!/usr/bin/nodejs

// -------------- load packages -------------- //
var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var hbs = require('hbs');

// -------------- express initialization -------------- //
app.set('port', process.env.PORT || 12475);

//tell express that the view engine is hbs
app.set('view engine', 'hbs');
app.use(express.static('static'));

// -------------- express 'get' handlers -------------- //
// These 'getters' are what fetch your pages

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mylabs', (req, res) => {
    res.send("my labs");
});

app.get('/funpage', (req, res) => {
    res.send("funpage");
});
var options = {
    headers: {
        'User-Agent': 'request'
    }
};

app.get('/getweather', (req, res, next) => {
        var url = 'https://api.weather.gov/points/' + req.query.lat + ',' + req.query.long;
        https.get(url, options, response => {
            var data = '';
            response.on('data', function(d) {
                console.log(d.toString());
                data += d;
            });
            response.on('end', () => {
                res.locals.obj = JSON.parse(data);
                next();
            });
        }).on('error', function(e) {
            console.error(e);
        });
    },
    (req, res) => {
        https.get(res.locals.obj.properties.forecast, options, response => {
            var data = '';
            response.on('data', d => {
                console.log(d.toString());
                data += d;
            });
            response.on('end', () => {
                res.locals.forecastObj = JSON.parse(data);
                var detailedForecasts = [];
                for (var forecast of res.locals.forecastObj.properties.periods){
                    detailedForecasts.push(forecast.name + ": " + forecast.detailedForecast);
                }
                console.log(res.locals.forecastObj.properties.periods.detailedForecast);
                var render_dict = {
                    state: res.locals.obj.properties.relativeLocation.properties.state,
                    city: res.locals.obj.properties.relativeLocation.properties.city,
                    forecast: detailedForecasts
                };
                res.render('weather', render_dict);
            });
        });

    }
);

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
// -------------- listener -------------- //
// The listener is what keeps node 'alive.' 

var listener = app.listen(app.get('port'), () => {
    console.log('Express server started on port: ' + listener.address().port);
});