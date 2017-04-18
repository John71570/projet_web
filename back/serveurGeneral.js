var nouveauRepas = require("./nouveauRepas.js");
var nouveauUser = require("./nouveauUser.js");
var express   =    require('express');
var bodyParser = require('body-parser');
var mysql     =    require('mysql');
var path = require('path');
var app       =    express();

app.use("/formulaire", express.static('./../front/formulaireInscription/formulaireInscription.html'));
app.use("/front", express.static('./../front/'));
//app.use("/traitement", express.static('./../front/traitement.html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'ratignier',
    database : 'BDD_ViensManger',
    debug    :  false
});

module.exports.pool = pool;

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }

        console.log('c  ' + connection.threadId);

        connection.query("select * from Utilisateur", function(err,rows){
            connection.release();
            if(!err) {
                for (i=0; i<rows.length; i++){
                  if (rows[i].adresseMail == "john71570@gmail.com"){console.log("Deja utilisé")}
                  res.json(rows);
                }
            }
        });

        connection.on('error', function(err) {
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;
        });
  });

  res.send("ACCEUIL");
}

//Page Acceuil
app.get("/",function(req,res){-
        handle_database(req,res);
});

//Page-URL pour soumettre un repas
app.get("/PropositionRepas",function(req,res){
  res.redirect('./../front/propositionRepas/NouveauRepas.html');
});
app.post("/SoumissionRepas", nouveauRepas.SOUMISSION_Repas);

//Page administrateur pour remplir la BDD (en construction, pour l'instant on peut inserer dans table Type)
app.get("/ADMIN", function(req, res){
  res.redirect('./../front/adminBDD/ADMIN_NouveauType.html')
})
app.post("/ADMIN_INSERT_TypeRepas", nouveauRepas.INSERT_nouveauTypeRepas);

app.post('/formulaireinscription/traitement', nouveauUser.add_user);

app.post('/traitement', (res, req)=>nouveauRepas.traitement);

app.listen(3000);
