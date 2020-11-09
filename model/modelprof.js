const mongoose = require('mongoose');
// Model Prof

var profsSchema = mongoose.Schema({
    name: String,
    prenom: String,
    datedenaissance: String,
    adresse: String
});

var Prof = mongoose.model ('Prof', profsSchema);

module.exports = Prof;