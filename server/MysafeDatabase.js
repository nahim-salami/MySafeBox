const mysql = require("mysql")

class MySafeDatabase {
    #db;
    constructor(username = "msfb", password = "mysafebox", host = "database-1.chy0hem4utjk.us-east-2.rds.amazonaws.com", name = "database-1") {
        this.#db = mysql.createConnection({
            user: username,
            host: host,
            password: password,
            database: name,
            multipleStatements: true
        });
        
        var that = this;
        this.#db.connect(function(err) {
            if (err) {
               console.log(err)
            }
        });

       
        this.#createTables();
    }

    #createTables() {
        var 
        query = "CREATE TABLE IF NOT EXISTS Users (";
        query += "userID int AUTO_INCREMENT PRIMARY KEY, ";
        query += "firstname VARCHAR(25), ";
        query += "lastname VARCHAR(50), ";
        query += "adress VARCHAR(255), ";
        query += "email VARCHAR(50), ";
        query += "role VARCHAR(15), ";
        query += "birthday VARCHAR(50) ";
        query += ")";
        
        this.#db.query(query, function (err, result) {
            if(err) {
                console.log(err)
            }
        });


        query = "CREATE TABLE IF NOT EXISTS Account (";
        query += "accountID int AUTO_INCREMENT PRIMARY KEY, ";
        query += "userID VARCHAR(25), ";
        query += "username VARCHAR(25), ";
        query += "password VARCHAR(255), ";
        query += "type VARCHAR(15), ";
        query += "role VARCHAR(15), ";
        query += "Mlog VARCHAR(255), ";
        query += "Status VARCHAR(25), ";
        query += "beginDay DATETIME, ";
        query += "endDay DATETIME";
        query += ")";
    
        this.#db.query(query, function (err, result) {
            if(err) {
                console.log(err)
            }
        });

        query = "CREATE TABLE IF NOT EXISTS Component (";
        query += "component_id int AUTO_INCREMENT PRIMARY KEY, ";
        query += "userID VARCHAR(25), ";
        query += "nom VARCHAR(255), ";
        query += "type VARCHAR(25), ";
        query += "categorie VARCHAR(50), ";
        query += "status VARCHAR(25), "; // Supprimer, Archiver, Draft, Publish
        query += "Mlog VARCHAR(255), ";
        query += "createDate DATETIME, "; // Date de création
        query += "path VARCHAR(255), "; // chemin du fichier
        query += "folder VARCHAR(255), "; // nom du dossier parent
        query += "folder_path VARCHAR(255) "; // chemin du dossier parent
        query += ")";

        this.#db.query(query, function (err, result) {
            if(err) {
                console.log(err)
            }
        });

        query = "CREATE TABLE IF NOT EXISTS Folder (";
        query += "Folder_id int AUTO_INCREMENT PRIMARY KEY, ";
        query += "userID VARCHAR(25), ";
        query += "nom VARCHAR(25), ";
        query += "status VARCHAR(25), "; // Supprimer, Archiver, Draft, Publish
        query += "Mlog VARCHAR(255), ";
        query += "createDate DATETIME, "; // Date de création
        query += "path VARCHAR(255), "; // chemin du dossier
        query += "folder_path VARCHAR(255) "; // chemin du dossier parent
        query += ")";
    
        this.#db.query(query, function (err, result) {
            if(err) {
                console.log(err)
            }
        });
    }

    getDb() {
        return this.#db;
    }
}

exports.MySafeDatabase = MySafeDatabase;