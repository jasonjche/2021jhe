var https = require('https');
var fs = require('fs');

module.exports.run_setup = function (app) {
    app.get('/corona', (req, res) => {
        res.render('partials/template', {
            name: 'Corona Counter',
            content: fs.readFileSync(__dirname + '/../views/map.hbs'),
            scripts: [
                {
                    src: 'js/map.js',
                },
            ],
            styles: ['css/map.css'],
        });
    });
};
