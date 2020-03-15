var lab_pets = require('./pets.js');
var lab_number = require('./numbers.js');
var lab_weather = require('./weather.js');
var lab_madLibs = require('./madLibs.js');
var lab_voting = require('./voting.js');
var lab_map = require('./map.js');

module.exports.do_setup = function(app) {
    lab_pets.run_setup(app);
    lab_number.run_setup(app);
    lab_weather.run_setup(app);
    lab_madLibs.run_setup(app);
    lab_voting.run_setup(app);
    lab_map.run_setup(app);
};
// module.exports preceding an entity is essentially a public declaration
// i.e. do_setup is callable function from this file