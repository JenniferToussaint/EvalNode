const mongoose = require('mongoose');

//Model Eleves
var elevesSchema = mongoose.Schema({
    name: String,
    prenom: String,
    datedenaissance: String,
    niveau: String,
    adresse: String
});

var Eleve = mongoose.model ('Eleve', elevesSchema);

module.exports = Eleve;