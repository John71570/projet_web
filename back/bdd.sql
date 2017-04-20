CREATE DATABASE BDD_ViensManger CHARACTER SET 'utf8';
USE BDD_ViensManger;

CREATE TABLE Utilisateur (
    adresseMail VARCHAR(50) NOT NULL,
    mdp VARCHAR(20) NOT NULL,
    prenom VARCHAR(30) NOT NULL,
    nom VARCHAR(30) NOT NULL,
    age SMALLINT UNSIGNED NOT NULL,
    description VARCHAR(200),
    numeroTel VARCHAR(15) NOT NULL,
    note SMALLINT UNSIGNED,
    photo VARCHAR(100),
    PRIMARY KEY (adresseMail)
);

CREATE TABLE Lieu(
    idLieu SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
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

CREATE TABLE Ambiance (
    idAmbiance SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL
);

CREATE TABLE Repas (
    idRepas SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	idLieuRepas SMALLINT UNSIGNED,
    idOrganisateurRepas VARCHAR(50),
	 idAmbianceRepas SMALLINT UNSIGNED,
    idTypeRepas SMALLINT UNSIGNED,
    nomRepas VARCHAR(130) NOT NULL,
    description VARCHAR(200),
    nbPlaces SMALLINT UNSIGNED NOT NULL,
    prixRepas SMALLINT UNSIGNED NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (idLieuRepas)
    	REFERENCES Lieu(idLieu),
    FOREIGN KEY (idOrganisateurRepas)
    	REFERENCES Utilisateur(adresseMail),
    FOREIGN KEY (idTypeRepas)
    	REFERENCES Type(idType),
    FOREIGN KEY (idAmbianceRepas)
      REFERENCES Ambiance(idAmbiance)
);

CREATE TABLE Liste (
    idListe SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idRepas SMALLINT UNSIGNED NOT NULL,
    idInvite1 VARCHAR(50),
    idInvite2 VARCHAR(50),
    idInvite3 VARCHAR(50),
    idInvite4 VARCHAR(50),
    idInvite5 VARCHAR(50),
    idInvite6 VARCHAR(50),
    idInvite7 VARCHAR(50),
    idInvite8 VARCHAR(50),
    idInvite9 VARCHAR(50),
    idInvite10 VARCHAR(50),
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

CREATE TABLE Allergie (
    idAllergie SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50)
);

CREATE TABLE UtilisateurAllergie(
    idAllergie SMALLINT UNSIGNED NOT NULL,
    idUtilisateur VARCHAR(50) NOT NULL,
    FOREIGN KEY (idAllergie)
    	REFERENCES Allergie(idAllergie),
    FOREIGN KEY (idUtilisateur)
    	REFERENCES Utilisateur(adresseMail)
);
