const mongoose = require('mongoose');

//Model Ecole
var ecoleSchema = mongoose.Schema({
    name: String,
    adresse: String,
    departement: String
});

var Ecole = mongoose.model('Ecole', ecoleSchema);

module.exports = Ecole;


