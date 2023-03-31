const md5 = require("md5");
const  { MySafeUsers } = require("./MySafeUsers.js");
const fs = require("fs");
const AccountRole = ["w", "x", "r", "p"];

class MySafeAccount extends MySafeUsers {
    #accountId;
    #userId;
    #password;
    #username;
    #log;
    allData;
    #beginDay;
    #endDay;
    /**
     *  w:write, r: read, x: delete, p: partage
     * 
     * @var
     */
    #role;

    /**
     * Admin, admin simple, invite, ....
     * 
     * @var
     */
    #accountType;
    connect = false;
    operation;
    request;
    
    constructor (data) {
        super(data);
        this.#setPassWord(data.password);
        this.#setUsername(data.username);
        this.#setRole(data.role);
        this.#setType(data.type);
        this.#setBeginDay(data.dateNow);
        this.#setEndDay(data.expire);
        this.operation = data.operation;
        this.request = data.request;
    }
    
    getUserName() {
        return this.#username;
    }

    isConnect() {
        return (this.connect) ? true : false;
    }

    getTheID() {
        return this.#userId;
    }

    /**
     * Set user password
     * 
     * @param {*string} password 
     */
    #setPassWord(password) {
        if(typeof password === "string" && password.length > 0) {
            this.#password = md5(password);
        }
    }

    /**
     * Set username
     * 
     * @param {*string} username 
     */
    #setUsername(username) {
        if(typeof username === "string" && username.length > 2) {
            this.#username = username;
        }
    }

    /**
     * Set user role.
     * 
     * @param {*string} role x r w p
     */
    #setRole(role) {
        var newRole = "";
        if(typeof role === "string") {
            role.split("").forEach(subrole => {
                if(AccountRole.indexOf(subrole) != -1) {
                    newRole += subrole;
                }
            });

            this.#role = newRole;
        }
    }

    /**
     * Set the account type.
     * @param {*string} type 
     */
    #setType(type) {
        if(typeof type === "string" && type.length > 2) {
            this.#accountType = type;
        }
    }

    /**
     * Set the account creation date.
     * @param {*string} date 
     */
    #setBeginDay(date) {
        var t = new Date(date);
        if(!isNaN(t.valueOf())) {
            this.#beginDay = date;
        }
    }

    #setEndDay(date) {
        var t = new Date(this.#beginDay);
        t.setMonth(t.getMonth() + parseInt(date));
        this.#endDay = t.getFullYear().toString() + '/' + t.getMonth() + '/' + t.getDay();
    }

    /**
     * Open user account
     */
    open() {
        var joinQuery = "SELECT DISTINCT * FROM Account JOIN users ON users.userID = account.userID WHERE username='"+ this.#username + "' OR email='" + this.#username + "' AND password='" + this.#password + "'";
        var result  =  false, that = this;
        this.parent.query(joinQuery, function(err, response){
            result = response;
        });

        var compt = 0, add = false;
        var timer = setInterval(()=>{
            if(result && result.length > 0 && that.operation == "login") {
                that.allData = result[0];
                that.#userId = result[0].userID;
                that.#username = result[0].username;
                if(that.#password == result[0].password) {
                    that.connect = true;
                    that.request.send({
                        message: `valid`,
                        data: {
                            id: that.#userId,
                            username: that.#username,
                            mail: result[0].email,
                            birthday: result[0].birthday
                        },
                    }).end();
                }
                else{
                    that.connect = false;
                    that.request.send({
                        message: `Identifiant invalid`
                    }).end();
                }
                clearInterval(timer);
            }
            else if(that.operation == "signup" && compt > 40 && !add && result.length <= 0) {
                that.add();
                add = true;
                var innerTimer = setInterval(()=>{
                    that.#userId = that.getID();
                    if(typeof that.getID() !== "undefined" && that.getID() != null) {
                        that.#create(that.getID());
                        that.request.send({
                            message: `create`,
                            data: {
                                id: that.#userId
                            }
                        }).end();
                        clearInterval(innerTimer);
                    }
                }, 50);
                clearInterval(timer);
            }
            else if(compt > 40 && !add) {
                that.request.send({
                    message: `Identifiant invalid`
                }).end();
                clearInterval(timer);
            }
            ++compt;
        }, 50);
    }

    /**
     * Create the user account.
     * @param {*int} id 
     */
    #create (id){
        var query = "INSERT INTO Account (userID, username, password, role, type, beginDay, endDay, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        var data = [id, this.#username, this.#password, this.#role, this.#accountType, this.#beginDay, this.#endDay, 'open'];
        this.parent.query(query, data, function (err, result) {
            if (err) throw err;
        });

        var path = "./userSpace/"+this.#username+"#"+id+"/";

        fs.access(path, (error) => {
            if (error) { 
                fs.mkdir(path, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully !!");
                }
                });
            } else {
                console.log("Given Directory already exists !!");
            }
        });
    }

    /**
     * Deativate users.
     */
    deativate() {
        var query = "UPDATE Account SET Status = 'close' WHERE username = '" + this.#username +"' and password = '" + this.#password + "'";
        this.parent.query(query, function (err, result) {
            if (err) throw err;
        });
    }

    getAllData() {
        return this.allData;
    }
}

exports.MySafeAccount = MySafeAccount;