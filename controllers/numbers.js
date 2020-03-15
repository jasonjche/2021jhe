module.exports.run_setup = function(app) {
var numberFacts = [
        ['It is the smallest positive integer',
        'It is the amount of friends I have',
        'Greek\'s did not consider it a number',
        'It is the 35th most commonly used word in the English language, just ahead of “all”.',
        'Icelandic for “one” is “eitt”, which sounds just like “eight”.'],
        ['It is the only even prime number',
        'It is considered lucky in China',
        'It\'s factorial is also 2',
        'It symbolizes partnership',
        'The Pythagoreans thought the number two to be the most unlucky'] ,
        ['It is considered an unlucky number in Vietnam',
        'It is the number of people who have reached the bottom of the Marinana Trench',
        'It is estimated that a human can only survive three days without water',
        'There are three primary colors',
        'There were three little pigs'],
        ['Four is the only number in English that is equal to the number of letters in its name.',
        'The ancient Greeks associated the number four with earthly balance, believing that everything was made of four elements: earth, air, fire and water.',
        'The word for ‘four’ in Chinese sounds like the word for ‘death’, which is why many hospitals in China have no fourth floor.',
        'There are four bottles of wine in a jeroboam.',
        'Any map may be coloured in four colours with no two regions that share a common stretch of border having the same colour.'],
        ['There are only five possible tetrominoes',
        'The name punch comes from the Hindi word for five.',
        'There are five vowels in the English language',
        'There are five rings in the Olympic symbol',
        '5 is the fifth fibonacci number'],
        ['6'],
        ['7'],
        ['8'],
        ['9'],
        ['10']];

app.get('/numberFact:page', function(req,res){
    var query = req.query.num_facts;
    var json = req.query.format;
    var number = req.params.page;
    if (number > 10 || number < 0)
        res.send('undefined');
    var render_dict = {
        number : number,
        numFacts : numberFacts[number - 1].slice(0, query)
    };
    if(json == 'json'){
        res.json(render_dict);
    }
    res.render('index', render_dict);
});
};