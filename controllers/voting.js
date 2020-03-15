var fs = require('fs');

module.exports.run_setup = function(app) {
var prices = {
    'pizza': 2,
    'soda': 1,
    'snacks': 1,
    'samosa': 2,
    'tofu': 5,
    'salmon': 9
};

app.get('/votingForm', (req, res) => {
    res.render('partials/template', {name : 'Voting', content : fs.readFileSync(__dirname + '/../views/votingForm.hbs')});
});

app.get('/votingWorker', (req, res) => {
    console.log(req.query);
    var salad_choice = req.query.salad;
    var main_choice = req.query.main;
    var total = prices[salad_choice] + prices[main_choice];
    res.json({
        'cost': total
    });
});
};