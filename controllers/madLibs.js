var fs = require('fs');

module.exports.run_setup = function(app) {
app.get('/madlibsForm', (req, res) => {
        res.render('partials/template', {name : 'Mad Libs', content : fs.readFileSync(__dirname + '/../views/madlibsForm.hbs')});
});

app.get('/madlibs', (req, res) => {
    console.log(req.body); // the posted data
    var render_dict = {
        number: req.query.number,
        body: req.query.body,
        place: req.query.place,
        noun: req.query.noun,
        noun2: req.query.noun2,
        noun3: req.query.noun3,
        noun4: req.query.noun4,
        lastName: req.query.lastName,
        plural: req.query.plural,
        occupation: req.query.occupation,
        adj: req.query.adj,
    };
    res.render('madlibs', render_dict);
});
};