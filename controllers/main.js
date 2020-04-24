var path = require('path');
var fs = require('fs');
var hbs = require('hbs');

module.exports.run_setup = function (app) {
    app.get('/', (req, res) => {
        res.redirect('home');
    });

    app.get('/home', (req, res) => {
        res.render('partials/template', {
            name: 'Home',
            content: fs.readFileSync(__dirname + '/../views/home.hbs'),
            styles: ['css/home.css'],
        });
    });
    app.get('/labs', (req, res) => {
        var template = hbs.handlebars.compile(
            fs.readFileSync(path.join(__dirname, '/../views/labs.hbs'), 'utf-8')
        );
        res.render('partials/template', {
            name: 'Labs',
            content: template(
                { labs: JSON.parse(fs.readFileSync(path.join(__dirname, '/../data/labs.json'), 'utf-8')) }
            ),
        });
    });

    app.get('/fun', (req, res) => {
        res.render('partials/template', {
            name: 'Fun',
            content: fs.readFileSync(__dirname + '/../views/fun.hbs'),
            scripts: [
                {
                    src: 'js/three.js',
                },
                {
                    src: 'js/fun.js',
                },
            ],
            styles: ['css/fun.css'],
        });
    });
};
