const mysql = require("mysql")

class MySafeDatabase {
    #db;
    constructor(username = "root", password = "", host = "localhost", name = "mysafebox") {
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
        setTimeout(()=>{
            this.#insertDefault();
        }, 1000);
    }

    #insertDefault() {
        var query = "INSERT INTO Users (userID, lastname, firstname, email, birthday) VALUES (?, ?, ?, ?, ?)";
        var data = [1, "admin", "admin", "admin@mysafebox.com", "1980-10-28"];
        this.#db.query(query, data, function (err, result) {
            if(err) {
                console.log("Une erreur est survenu")
            }
        });

        var query = "INSERT INTO Account (accountID, userID, username, password, type, role, Mlog, Status, beginDay, endDay) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var data = [1, 1, "admin", "21232f297a57a5a743894a0e4a801fc3", "none", "wxrp", "NULL", "open", "2023-03-27 11:17:11", "2024-02-03 00:00:00"];
        
        this.#db.query(query, data, function (err, result) {
            if(err) {
                console.log("Une erreur est survenu")
            }
        });

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