var https = require('https');
var fs = require('fs');

module.exports.run_setup = function(app) {
app.get('/map', (req, res) => {
        res.render('partials/template', {name : 'Map Game', content : fs.readFileSync(__dirname + '/../views/map.hbs')});
});
};