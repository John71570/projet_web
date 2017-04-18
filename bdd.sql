CREATE DATABASE bdd CHARACTER SET 'utf8';
USE bdd;

CREATE TABLE Utilisateur (
    adresseMail  VARCHAR(30) NOT NULL,
    mdp VARCHAR(20) NOT NULL,
    photo VARCHAR(100),
    age SMALLINT UNSIGNED,
    nom VARCHAR(30) NOT NULL,
    Description VARCHAR(200),
    note SMALLINT UNSIGNED,
    numeroTel VARCHAR(15) NOT NULL,		
    PRIMARY KEY (adresseMail)
);

CREATE TABLE Lieux (
    idLieux SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    pays VARCHAR(40) NOT NULL,
    ville VARCHAR(40) NOT NULL,
    rue VARCHAR(40) NOT NULL,
    numero SMALLINT NOT NULL
);

CREATE TABLE Type (
    idType SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    intitule VARCHAR(40) NOT NULL,
    description VARCHAR(200),
    photo VARCHAR(100)
);

CREATE TABLE Repas (
    idRepas SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(200),
    nbPlaces SMALLINT UNSIGNED NOT NULL,
    date DATETIME NOT NULL,
    Lieux SMALLINT UNSIGNED NOT NULL,
    Organisateur VARCHAR(30) NOT NULL,
    Type SMALLINT UNSIGNED NOT NULL,
    FOREIGN KEY (Lieux)             
    	REFERENCES Lieux (idLieux),       
    FOREIGN KEY (Organisateur)             
    	REFERENCES Utilisateur (adresseMail),       
    FOREIGN KEY (Type)             
    	REFERENCES Type (idType)
);



CREATE TABLE Liste (
    idListe SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idInvite1 VARCHAR(30),
    idInvite2 VARCHAR(30),  
    idInvite3 VARCHAR(30),  
    idInvite4 VARCHAR(30),  
    idInvite5 VARCHAR(30),  
    idInvite6 VARCHAR(30),
    idInvite7 VARCHAR(30), 
    idInvite8 VARCHAR(30),
    idInvite9 VARCHAR(30),
    idInvite10 VARCHAR(30),
    idRepas SMALLINT UNSIGNED NOT NULL,         
    FOREIGN KEY (idRepas)             
    	REFERENCES Repas(idRepas),
    FOREIGN KEY (idInvite1)             
    	REFERENCES Utilisateur(adresseMail),        
    FOREIGN KEY (idInvite2)             
    	REFERENCES Utilisateur(adresseMail),        
    FOREIGN KEY (idInvite3)             
    	REFERENCES Utilisateur(adresseMail),          
    FOREIGN KEY (idInvite4)             
    	REFERENCES Utilisateur(adresseMail),         
    FOREIGN KEY (idInvite5)             
    	REFERENCES Utilisateur(adresseMail),         
    FOREIGN KEY (idInvite6)             
    	REFERENCES Utilisateur(adresseMail),        
    FOREIGN KEY (idInvite7)             
    	REFERENCES Utilisateur(adresseMail),        
    FOREIGN KEY (idInvite8)             
    	REFERENCES Utilisateur(adresseMail),         
    FOREIGN KEY (idInvite9)             
    	REFERENCES Utilisateur(adresseMail),          
    FOREIGN KEY (idInvite10)             
    	REFERENCES Utilisateur(adresseMail)
);

CREATE TABLE Allergies (
    idAllergie SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    Nom varchar(30)
);

CREATE TABLE  listeAllergies(
    idAllergies SMALLINT,
    idUtilisateur SMALLINT,
    FOREIGN KEY (idAllergies)             
    	REFERENCES Allergies(idAllergies), 
    FOREIGN KEY (idUtilisateur)             
    	REFERENCES Utilisateur(adresseMail)
);     
   




