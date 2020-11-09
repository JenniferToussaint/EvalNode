// DECLARATION DES CONSTANTES

const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const Ecole = require('./model/modelecole');
const Eleve = require('./model/modeleleve');
const Prof = require('./model/modelprof');

//Connexion a mon compte MongoCloud
const uri = "mongodb+srv://Jennifer:3004@cluster0.lcbpv.mongodb.net/Cluster0?retryWrites=true&w=majority";

// DEMARRAGE DU SERVEUR

var app = express();


//J'utilise le système de promesse, Node est asynchrone je ne veux pas que le serveur soit lancé avant la connexion
var promise = mongoose.connect(uri, {useNewUrlParser: true});
promise.then((db) =>{
    console.log('DB connected');
    app.listen(3000, () =>{

        //A l'ouverture du serveur je mets ce message d'accueil
        console.log('Listening on port 3000!');
    });
});




//CONFIGURATION
app.use('/pages', express.static('./client/pages'));
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());





// ROUTES

//Routes de demarrage pour charger automatiquement la page html

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/client/index.html');
});

//Post Ecole
app.post('/ecole', (req, res) =>{
    var newEcole = new Ecole(req.body);
    console.log(newEcole);
    newEcole.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});

//Post Eleve
app.post('/eleves', (req, res) =>{
    var newEleve = new Eleve (req.body);
    console.log(newEleve);
    newEleve.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});

//Post Profs
app.post('/profs', (req, res) =>{
    var newProf = new Prof (req.body);
    console.log(newProf);
    newProf.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});

// GET ecole

app.get('/ecole', (req, res) =>{

    Ecole.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});

// GET elève

app.get('/eleves', (req, res) =>{

    Eleve.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});

// GET prof

app.get('/profs', (req, res) =>{

    Prof.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});





//////////////////////////////////////////////////
//GET ECOLE
app.get('/ecole/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    Ecole.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });
    // PUT Ecole
    app.put('/ecole/:id', (req, res) =>{
        Ecole.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
            if(err){
                console.log(err);
                return res.send(500);
            }
            res.send(obj);
        });
 
        }); 

        /////////////////////////////////////////////////////////////////////////

    //GET Eleves
app.get('/eleves/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    Eleve.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });

     // PUT Eleve
 app.put('/eleves/:id', (req, res) =>{
    Eleve.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj);
    });

    }); 


    ///////////////////////////////////////////////////

    //GET Prof
app.get('/profs/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    Ecole.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });

 
    
    
 // PUT Prof
 app.put('/profs/:id', (req, res) =>{
    Prof.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj);
    });

    });     