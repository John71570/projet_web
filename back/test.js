var express   =    require('express');
var bodyParser = require('body-parser');
var mysql     =    require('mysql');
var app       =    express();

app.use(express.static('./front'));
app.use('/lib', express.static('node_modules'));
app.use("/formulaire", express.static('./front/form.html'));
//app.use("/traitement", express.static('./../front/traitement.html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'votre mot de passe',
    database : 'bdd',
    debug    :  false
});

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
}



app.get("/",function(req,res){-
        handle_database(req,res);
});

function add_user(req,res) {
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
            photo: null,
            age: req.body.age,
            nom: req.body.nom,
            Description: req.body.description,
            note: null,
            numeroTel: req.body.tel
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

app.post('/formulaireinscription/traitement', function(req, res){
    add_user(req, res);
});

app.listen(3000);
