///////////////////////////////////////
///// DECLARATION DES CONSTANTES //////
///////////////////////////////////////

const express = require('express');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const Ecole = require('./model/modelecole');
const Eleve = require('./model/modeleleve');
const Prof = require('./model/modelprof');

//Connexion a mon compte MongoCloud
const uri = "mongodb+srv://Jennifer:3004@cluster0.lcbpv.mongodb.net/Cluster0?retryWrites=true&w=majority";
mongoose.set('useUnifiedTopology', true);

/////////////////////////
// DEMARRAGE DU SERVEUR//
/////////////////////////

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



/////////////////////
////CONFIGURATION////
/////////////////////

app.use('/pages', express.static('./client/pages'));
app.use('/js', express.static('./client/js'));
app.use('/css', express.static('./client/css'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);






///////////////
////ROUTES/////
///////////////


//Routes de demarrage pour charger automatiquement la page html

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/client/index.html');
});

/////////////////////////////////////////////////////////////// PARTIE ECOLE //////////////////////////////////////////////////////////////////////////////////

//////////////
//POST ECOLE//
//////////////

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


//////////////
//GET ECOLE//
//////////////

app.get('/ecole', (req, res) =>{

    Ecole.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});




//////////////
//GET ECOLE//
//////////////


app.get('/ecole/:id', (req, res) =>{
    Ecole.findOne({_id: req.params.id}, (err, obj) =>{
    
        if(err){
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });


//////////////
//PUT ECOLE//
//////////////


 app.put('/ecole/:id', (req, res) =>{
    Ecole.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj);
    });
 
    }); 

/////////////////
///DELETE ECOLE//
/////////////////
  
    app.delete('/ecole/:id', (req, res) =>{
            Ecole.deleteOne({_id: req.params.id}, (err, obj) =>{
                if(err) {
            
                    console.log(err);
                    res.send(500);
                }
                res.sendStatus(200);
            });
            });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// PARTIE ELEVES //////////////////////////////////////////////////////////////////////////////////



///////////////
//POST ELEVES//
///////////////

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

///////////////
///GET ELEVES//
///////////////

app.get('/eleves', (req, res) =>{

    Eleve.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});


///////////////
///GET ELEVES//
///////////////


    app.get('/eleves/:id', (req, res) =>{
        Eleve.findOne({_id: req.params.id}, (err, obj) =>{
            if(err){
                console.log(err);
                return res.send(500);
            }
        
            return res.send(obj);
            })
        });
    
///////////////
///PUT ELEVES//
///////////////

     app.put('/eleves/:id', (req, res) =>{
        Eleve.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true, }, (err, obj) =>{
            if(err){
                console.log(err);
                return res.send(500);
            }
            res.send(obj);
        });
    
        }); 

//////////////////
///DELETE ELEVES//
//////////////////

        app.delete('/eleves/:id', (req, res) =>{
            Eleve.deleteOne({_id: req.params.id}, (err, obj) =>{
                if(err) {
                    console.log(err);
                    res.send(500);
                }
                res.sendStatus(200);
            });
            });
    
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// PARTIE PROFS //////////////////////////////////////////////////////////////////////////////////




///////////////
//POST PROFS///
///////////////
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



///////////////
//GET PROFS///
///////////////

app.get('/profs', (req, res) =>{

    Prof.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});


///////////////
//GET PROFS///
///////////////

app.get('/profs/:id', (req, res) =>{
    //pour effectuer une recherche on va utiliser le modèle
    //BodyParser permet de conserver l'id dans req.params.id
    Prof.findOne({_id: req.params.id}, (err, obj) =>{
        if(err){
            // on gère l'erreur
            console.log(err);
            return res.send(500);
        }
    
        return res.send(obj);
        })
    });


///////////////
///PUT PROFS///
///////////////

 app.put('/profs/:id', (req, res) =>{
    Prof.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj);
    });

    });     

/////////////////
//DELETE PROFS///
/////////////////

    app.delete('/profs/:id', (req, res) =>{
        Prof.deleteOne({_id: req.params.id}, (err, obj) =>{
            if(err) {
                console.log(err);
                res.send(500);
            }
            res.sendStatus(200);
        });
        });