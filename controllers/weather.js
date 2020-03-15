var https = require('https');
var fs = require('fs');
var hbs = require('hbs');

module.exports.run_setup = function(app) {
app.get('/weather', (req, res) => {
        res.render('partials/template', {name : 'Weather Forecast', content : fs.readFileSync(__dirname + '/../views/weather.hbs')});
});

var options = {
    headers: {
        'User-Agent': 'request'
    }
};

app.get('/getweather', (req, res, next) => {
        var url = 'https://api.weather.gov/points/' + req.query.lat + ',' + req.query.long;
        https.get(url, options, response => {
            if (response.statusCode == 404) {
                res.render('partials/template', {name : 'Weather Forecast', content : 'There is no forecast available at this location'});
                return;
            }   
            if (response.statusCode == 301) {
                res.render('partials/template', {name : 'Weather Forecast', content : 'The longitude or latitude coordinates are too precise. Please limit to 4 decimal places.'});
                return;
            }
                var data = '';
            response.on('data', function(d) {
                //console.log(d.toString());
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
                    //console.log(d.toString());
                    data += d;
                });
                response.on('end', () => {
                    res.locals.forecastObj = JSON.parse(data);
                    var detailedForecasts = [];
                    for (var forecast of res.locals.forecastObj.properties.periods) {
                        detailedForecasts.push(forecast.name + ": " + forecast.detailedForecast);
                    }
                    //console.log(res.locals.forecastObj.properties.periods.detailedForecast);
                    var render_dict = {
                        state: res.locals.obj.properties.relativeLocation.properties.state,
                        city: res.locals.obj.properties.relativeLocation.properties.city,
                        forecast: detailedForecasts
                    };
                    //console.log(render_dict);

                    var content = hbs.handlebars.compile(
                        fs.readFileSync(__dirname + '/../views/weatherResults.hbs', 'utf-8'));
                    res.render('partials/template', {name : 'Weather Forecast', content : content(render_dict)});
                });
            });
    }
);
};