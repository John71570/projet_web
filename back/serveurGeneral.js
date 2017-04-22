var nouveauRepas  = require("./nouveauRepas.js");
var nouveauUser   = require("./nouveauUser.js");
var express       = require('express');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mysql         = require('mysql');
var path          = require('path');
var app           = express();

app.use("/front", express.static('./../front/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(bodyParser());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'ratignier',
    database : 'BDD_ViensManger',
    debug    :  false
});

module.exports.pool = pool;

//-------------------------FONCTIONS DIVERSES CONFIGURATION--------------------

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

        module.exports.connection = connection;
        console.log('c  ' + connection.threadId);


        connection.query("select * from Utilisateur", function(err,rows){
            connection.release();
            if(!err) {
                for (i=0; i<rows.length; i++){
                  if (rows[i].adresseMail == "john71570@gmail.com"){console.log("Deja utilisé")}
                }
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
  });

  res.redirect('./../front/home/index.html');
}




//--------------------------------GESTION DES ROUTES---------------------------

//Page Acceuil
app.get("/",function(req,res){
        handle_database(req,res);
});

app.get("/Me",function(req,res){
  res.redirect('./../front/home/indexME.html');;
});

//Page d'Inscription
app.get("/Inscription", function(req,res){
  res.redirect('./../front/login/inscription.html')
});
app.post("/InscriptionVALIDE", nouveauUser.add_user);

//Page de Connexion
app.get("/Connexion", function(req,res){
  res.redirect('./../front/login/connexion.html')
});
app.post("/ConnexionVALIDE", function(req, res){
  var sess = req.session;
  sess.username=req.body.uu;
  sess.password=req.body.pp;
  if (sess.views) {
    sess.views++;
  } else {
    sess.views = 1;
    //res.send('welcome to the session demo. refresh!');
    console.log(sess);
    res.redirect('/Me');
  }
});

//Page de Deconnexion
app.get("/Deconnexion", function(req,res){
  req.session.destroy();
  console.log(req.session);
  res.redirect('./../front/home/index.html')
});


//Page-URL pour soumettre un repas
app.get("/PropositionRepas",function(req,res){
  res.redirect('./../front/propositionRepas/NouveauRepas.html');
});
app.post("/SoumissionRepas", nouveauRepas.SOUMISSION_Repas);

//Page de Repas
app.get("/Repas", function(req,res){
  res.redirect('./../front/pageRepas/PageRepas.html')
});

//Page administrateur pour remplir la BDD (en construction, pour l'instant on peut inserer dans table Type)
app.get("/ADMIN", function(req, res){
  res.redirect('./../front/adminBDD/ADMIN_NouveauType.html')
})
app.post("/ADMIN_INSERT_TypeRepas", nouveauRepas.INSERT_nouveauTypeRepas);


app.post('/traitement', (res, req)=>nouveauRepas.traitement);

//Ecoute port
app.listen(3000);
