var fs = require('fs');

var data = JSON.parse(
    fs.readFileSync(__dirname + '/../data/vote.json', 'utf-8')
);

module.exports.run_setup = function(app) {
    app.get('/votingForm', (req, res) => {
        res.render('partials/template', {
            name: 'Voting',
            content: fs.readFileSync(__dirname + '/../views/votingForm.hbs'),
            scripts: [
                {
                    src:
                        'https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js',
                    integrity:
                        'sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI=',
                    crossorigin: 'anonymous',
                },
                {
                    src: '../js/demo.js', 
                },
            ],
        });
    });

    app.post('/votingWorker', (req, res) => {
        var choice = req.body.choice;
        data[choice]++;
        fs.writeFile(
            __dirname + '/../data/vote.json',
            JSON.stringify(data),
            'utf-8',
            err => {
                if (err) console.log(err);
            }
        );
        console.log(data);
        res.json(data);
    });
};
