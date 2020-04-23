var path = require('path');
var fs = require('fs');

module.exports.run_setup = function (app) {
    app.get('/', (req, res) => {
        res.redirect('home');
    });

    app.get('/home', (req, res) => {
        res.render('partials/template', {
            name: 'Home',
            content: fs.readFileSync(__dirname + '/../views/index.hbs'),
        });
    });

    app.get('/mylabs', (req, res) => {
        res.render('partials/template', {
            name: 'Labs',
            content: fs.readFileSync(__dirname + '/../views/labs.hbs'),
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

    app.get('/pets', (req, res) => {
        res.render('partials/template', {
            name: 'Pets',
            content: fs.readFileSync(__dirname + '/../views/pets.hbs'),
        });
    });

    app.get('/dog.jpg', function (req, res) {
        var full_path = path.join(__dirname, 'cat.jpg');
        console.log('cat');
        res.sendFile(full_path);
    });

    app.get('/cat.jpg', function (req, res) {
        var full_path = path.join(__dirname, 'doge.jpg');
        console.log('dawg');
        res.sendFile(full_path);
    });

    app.get('/pet', function (req, res) {
        var theQuery = req.query.type;
        if (theQuery == 'dog') {
            var full_path = path.join(__dirname, 'doge.jpg');
            console.log('dawg');
            res.sendFile(full_path);
        } else if (theQuery == 'cat') {
            full_path = path.join(__dirname, 'cat.jpg');
            console.log('cat');
            res.sendFile(full_path);
        } else res.send('undefined');
    });

    function browser(req, res) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var browser = req.useragent.browser;
        res.send('Your IP is: ' + ip + '\n Your browser is: ' + browser);
    }

    app.get('/browser.html', browser);
};
