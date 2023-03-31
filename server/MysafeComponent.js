const { MySafeDatabase } = require("./MysafeDatabase.js");
const {ReactSession} = require("react-client-session")
const fs = require("fs");
class MySafeComponents extends MySafeDatabase{
    constructor() {
        super();
    }

    /**
     * Set component name.
     * @param {* string} name 
     */
    setName(name) {
        if(typeof name === "string" && name.length > 1) {
            this.name = name;
        }
    }

    /**
     * Set component type
     * @param {*string} type 
     */
    setType(type) {
        if(typeof type === "string" && type.length > 1) {
            this.type = type;
        }
    }

    /**
     * Set component path
     * @param {*string} path 
     */
    setPath(path) {
        if(typeof path === "string" && path.length > 1) {
            this.path = path;
        }
    }

    /**
     * Set component categorie.
     * 
     * @param {*string} categorie 
     */
    setCategorie(categorie) {
        if(typeof categorie === "string" && categorie.length > 1) {
            this.categorie = categorie;
        }
    }

    /**
     * Set component status.
     * 
     * @param {*string} status 
     */
    setStatus(status) {
        if(typeof status === "string" && status.length > 1) {
            this.status = status;
        }
    }

    /**
     * Set folder name.
     * 
     * @param {*string} folderName 
     */
    setFolderName(folderName) {
        if(typeof folderName === "string" && folderName.length > 0) {
            this.folderName = folderName;
        }
    }

    /**
     * Set folder path.
     * 
     * @param {*string} folderPath 
     */
    setFolderPath(folderPath) {
        if(typeof folderPath === "string" && folderPath.length > 0) {
            this.folderPath = folderPath;
        }
    }

    /**
     * Set request.
     * 
     * @param {*objet} request 
     */
    setRequest(request) {
        this.request = request;
    }

    /**
     * Set response.
     * 
     * @param {*object} response 
     */
    setResponse(response) {
        this.response = response;
    }

    /**
     * Create folder
     * 
     * @param {* string} path Folder path
     * @param {* string} name 
     * @returns 
     */
    createFolder(path, name) {
        var session_key  = ReactSession.get("session_token"), that = this;
        var session  = ReactSession.get(session_key);
        if(!session || typeof session === "undefined") return false;
        var data = session.getAllData();
        var role = data.role;
        if(session.isConnect() && role != null && role.indexOf('w') != '-1') {
            var userSpace = "./userSpace/" + session.getUserName() + "#" + session.getTheID();
            var folderPath = userSpace + '/' + path + '/' + name;
            fs.access(folderPath, (error) => {
                if (error) {
                    var query = "INSERT INTO Folder (userID, nom, status, path, folder_path, createDate) VALUES (?, ?, ?, ?, ?, ?)";
                    var data = [session.getTheID(), name, that.status, folderPath, path, new Date()];
                    that.getDb().query(query, data, function (err, result) {
                        if(err) {
                            that.response.send("An error occured").end();
                        }
                        else {
                            fs.mkdir(folderPath, (error) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log("New Directory created successfully !!");
                                }
                            });
                            that.response.send("Folder created").end();
                        }
                    });
                } else {
                    console.log("Given Directory already exists !!");
                }
            });
        }
        else {
            that.response.send("You are not allowed to create a folder").end();
        }
    }
    

    /**
     * 
     * @returns Create component and uplaod files.
     */
    create() {
        var session_key  = ReactSession.get("session_token"), that = this;
        var session  = ReactSession.get(session_key);
        if(!session || typeof session === "undefined") return false;
        var data = session.getAllData();
        var role = data.role;
        if(session.isConnect() && role != null && role.indexOf('w') != '-1') {
            var userSpace = "./userSpace/" + session.getUserName() + "#" + session.getTheID();
            var query = "INSERT INTO Component (userID, nom, type, categorie, status, path, folder, folder_path, createDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            var filedata = Buffer.from(this.path.split(";base64,")[1], 'base64');
            var file = userSpace + this.folderPath + this.name;
            this.setPath(file);
            var data = [session.getTheID(), this.name, this.type, this.categorie, this.status, this.path, this.folderName, this.folderPath, new Date()];
            this.getDb().query(query, data, function (err, result) {
                if(err) {
                    that.response.send("An error occured").end();
                }
                else {
                    console.log(file)
                    if(!fs.existsSync(file)) {
                        // append data to a file
                        fs.appendFile(file, filedata, err => {
                            if (err) {
                            throw err
                            }
                            console.log('File is updated.')
                            that.response.send("File is upload").end();
                        });
                    }
                    else {
                        console.log('File exist.')
                        that.response.send("File exist").end();
                    }
                   
                }
            });
        }
        else {
            that.response.send("Your are not connected").end();
        }
    }

    /**
     * Remove folder.
     * @param {*} path  Folder path.
     */
    removeFolder(folder_id, path) {
        var that = this;
        var session_key  = ReactSession.get("session_token"), that = this;
        var session  = ReactSession.get(session_key);
        if(!session || typeof session === "undefined") return false;
        var data = session.getAllData();
        var role = data.role;
        if(session.isConnect() && role != null && role.indexOf('x') != '-1') {
            fs.access(path, (error) => {
                if(!error) {
                    var query = "DELETE FROM Folder WHERE folder_id=" + folder_id + " AND userID =" + session.getTheID();
                    that.getDb().query(query, function(err, res){
                        if(!err) {
                            fs.rmdir(path, { recursive: true, force: true })
                            that.response.send(
                                {
                                    message:"Folder remove",
                                    succes: true
                                }
                            ).end();
                        }
                        else {
                            that.response.send({
                                message:"Your are not allowed to remove",
                                succes: false
                            }).end();
                        }
                    })
                }
                else {
                    that.response.send({
                        message:"Your are not allowed to remove",
                        succes: false
                    }).end();
                }
            })
        }
        else {
            that.response.send({
                message:"Your are not allowed to remove",
                succes: false
            }).end();
        }
    }

    /**
     * Remove file
     * @param {*} path  File path
     */
    remove(component_id, path) {
        var that = this;
        var session_key  = ReactSession.get("session_token"), that = this;
        var session  = ReactSession.get(session_key);
        if(!session || typeof session === "undefined") return false;
        var data = session.getAllData();
        var role = data.role;
        if(session.isConnect() && role != null && role.indexOf('x') != '-1') {
            fs.access(path, (error) => {
                if(!error) {
                    var query = "DELETE FROM Component WHERE component_id=" + component_id + " AND userID =" + session.getTheID();
                    that.getDb().query(query, function(err, res){
                        if(!err) {
                            fs.rmSync(path, { recursive: true, force: true });
                            that.response.send({
                                message:"File remove",
                                succes: true
                            }).end();
                        }
                    })
                }
                else {
                    that.response.send({
                        message:"Your are not allowed to remove",
                        succes: false
                    }).end();
                }
            })
        }
        else {
            that.response.send({
                message:"Your are not allowed to remove",
                succes: false
            }).end();
        }
        
    }

    /**
     * Get file and folder list.
     * 
     * @param {*string} path 
     * @returns 
     */
    list(path = 'all') {
        var that = this;
        var session_key  = ReactSession.get("session_token"), that = this;
        var session  = ReactSession.get(session_key);
        if(!session || typeof session === "undefined") return false;
        if(session.isConnect()) {
            if(path == 'all') {
                var query = "SELECT * FROM Component WHERE userID=" + session.getTheID();
                that.getDb().query(query, function(err, res){
                    if(!err) {
                        that.response.send(res).end();
                    }
                })
            }
            else if(path == 'folder') {
                var query = "SELECT * FROM Folder WHERE userID=" + session.getTheID();
                that.getDb().query(query, function(err, res){
                    if(!err) {
                        that.response.send(res).end();
                    }
                })
            }
            else {
                var query = "SELECT * FROM Component WHERE path ='"+ path +"' userID =" + session.getTheID();
                that.getDb().query(query, function(err, res){
                    if(!err) {
                        that.response.send(res).end();
                    }
                })
            }
        }
    }

    getPath() {
        return this.path;
    }

}


exports.MySafeComponents = MySafeComponents;