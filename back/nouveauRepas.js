var tr = function (req, res){
    var nomD = req.body.nom;
    var emailD = req.body.courriel;
    var messageD = req.body.message;
    res.send(nomD + ' ' + emailD + ' ' + messageD);
}
module.exports.traitement = tr;

//Fonction ADMINISTRATEUR BDD -- Ajout dans la table "Type"
var INSERT_nouveauTypeRepas = function(req, res){
  var intituleType = req.body.IntituleType;
  var descriptionType = req.body.DescriptionType;

  //Recuperer pool du fichier Node pour agir sur la BDD
  var fichierNode= require("./serveurGeneral.js");
  var pool = fichierNode.pool;

  pool.getConnection(function(err, connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }

      console.log('connexion numero ' + connection.threadId);

      connection.query("INSERT INTO Type (intitule, description) VALUES" +'(\''+intituleType+'\',\''+descriptionType+'\')', function(err, resp){
          connection.release();
          connection.query("SELECT * FROM Type", function(err,rows){
            console.log("C'est sbon");
            res.json(rows);
          });
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
      });
  });

}
module.exports.INSERT_nouveauTypeRepas = INSERT_nouveauTypeRepas;

var SOUMISSION_Repas = function(req, res){
  var nomRepas = req.body.TitreRepas;
  var description = req.body.DescriptionRepas;
  var nbPlace = req.body.NombreConviveRepas;
  var prix = req.body.PrixRepas;
  var pays = req.body.Pays;
  var ville = req.body.Ville;
  var rue = req.body.Rue;
  var numero = req.body.Numero;
  var dateR = req.body.DateRepas;

  //Recuperer le pool du node pour pouvoir agir sur la bdd
  var fichierNode = require("./serveurGeneral.js");
  var pool = fichierNode.pool;

  pool.getConnection(function(err, connection){
      if (err) {
        res.json({"code" : 100, "status" : "Error in connection database"});
        return;
      }

    console.log('connexion numero ' + connection.threadId);

/*      connection.query("INSERT INTO Lieu (pays, ville, rue, numero) VALUES" +'(\''+pays+'\',\''+ville+'\',\''+rue+'\',\''+numero+'\')', function(err, resp){
          connection.release();
          console.log(resp);
      });
*/
      connection.query("INSERT INTO Repas (nomRepas, description, nbPlaces, prixRepas, date) VALUES" +'(\''+nomRepas+'\',\''+description+'\',\''+nbPlace+'\',\''+prix+'\',\''+dateR+'\')', function(err, respp){
        console.log(err);
        connection.query("SELECT * FROM Repas", function(err, rows){
          console.log("C'est sbon");
          res.json(rows);
          return;
        });
      });

      connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
      });
  });

}
module.exports.SOUMISSION_Repas = SOUMISSION_Repas;
