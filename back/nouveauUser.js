


//---------FONCTION AJOUT UTILISATEUR---------------------------------------
var add_user = function (req,res) {
  //Recuperer pool du fichier Node pour pouvoir agir sur la bdd
  var fichierNode= require("./serveurGeneral.js");
  var pool = fichierNode.pool;

  pool.getConnection(function(err,connection){
    var integer = 1;
    if (err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }
    console.log('c  ' + connection.threadId);
    connection.query("select * from Utilisateur", function(err,rows){
      connection.release();
      if(!err) {
        for (i=0; i<rows.length; i++){
            if (rows[i].courriel == req.body.courriel){
            console.log("Adresse mail deja utilisé")
            intger --
            res.send(500,'showAlert')
          }
        }
        if(integer != 0){
          var newUser = {
            adresseMail: req.body.courriel,
            mdp: req.body.psw,
            prenom: req.body.prenom,
            nom: req.body.nom,
            age: req.body.age,
            description: req.body.description,
            numeroTel: req.body.tel,
            note: null,
            photo: null
          }
          connection.query('INSERT INTO Utilisateur SET ?', newUser, function (err, resp) {
          if (err) throw err;
            // if there are no errors send an OK message.
            res.send('Save succesfull');
          });
        }
      }
    });
    connection.on('error', function(err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });

}
module.exports.add_user=add_user;
