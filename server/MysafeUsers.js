const db = require("./MysafeDatabase");
var MySafeDatabase = db.MySafeDatabase;
/**
 * The user class allows to manage everything concerning the user's data.
 * 
 * @version 1.0.0
 * @author Nahim Salami
 * @link https://github.com/nahim-salami/
 * @package MYSAFEBOX
 * @subPackage MYSAFEBOX/Back-End
 */
class MySafeUsers extends MySafeDatabase{
    /**
     * @var #parent MySafeDatabasedata
     */
    parent;
    #lastname;
    #firstname;
    #birthday;
    #adress;
    #mail;
    #userId;
    #allKeys;

    /**
     * This is the constructor of the Users class.
     * 
     * @param {*object} userData The user data to be initialized { . . . }.
     * @returns
     */
    constructor(userData) {
       super();
       this.parent = this.getDb();
        if(typeof userData !== "object") {
            console.log("Une erreur s'est produite. Vérifier les données");
            return;
        }

        if(typeof userData.firstname !== "undefined") {
            this.#setFirstName(userData.firstname);
        }

        if(typeof userData.lastname !== "undefined") {
            this.#setLastName(userData.lastname);
        }

        if(typeof userData.birthday !== "undefined") {
            this.#setBirthDay(userData.birthday);
        }

        if(typeof userData.mail !== "undefined") {
            this.#setMail(userData.mail);
        }

        if(typeof userData.adress !== "undefined") {
            this.#setAdress(userData.adress);
        }

        var query = "SELECT userID FROM Users";
        var that = this;
        this.parent.query(query, function (err, result) {
            that.allKeys = result;
        });
    }

    #setAdress(adress) {
        if(typeof adress === "string" && adress.length > 2) {
            this.#adress = adress;
        }
    }

    /**
     * Define the user's first name.
     * @param {*string} firstname 
     */
    #setFirstName(firstname) {
        if(typeof firstname === "string" && firstname.length > 2) {
            this.#firstname = firstname;
        }
    }

    /**
     * Define the user's last name.
     * @param {*string} lastname 
     */
    #setLastName(lastname) {
        if(typeof lastname === "string" && lastname.length > 2) {
            this.#lastname = lastname;
        }
    }

    /**
     * Define the user's birth day.
     * @param {*string} birthday 
     */
    #setBirthDay(birthday) {
        var t = new Date(birthday);
        if(!isNaN(t.valueOf())) {
            this.#birthday = birthday;
        }
    }

    /**
     * Define the user's mail.
     * @param {*string} mail 
     */
    #setMail(mail) {
        if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(mail)) {
            this.#mail = mail;
        }
    }


    /**
     * Get the user's first name.
     * @returns firstname
     */
    getFirstName() {
        return this.#firstname;
    }

    /**
     * Get the user's last name.
     * @returns lastname
     */
    getLastName() {
        return this.#lastname;
    }

    /**
     * Get the user's birth day.
     * @returns lastname
     */
    getBirthDay() {
        return this.#birthday;
    }

    /**
     * Get the user's birth day.
     * @returns lastname
     */
    getMail() {
        return this.#mail;
    }

    add() {
        var that = this;
        var query = "INSERT INTO Users (lastname, firstname, email, birthday) VALUES (?, ?, ?, ?)";
        var data = [this.getLastName(), this.getFirstName(), this.getMail(), this.getBirthDay()]
        this.parent.query(query, data, function (err, result) {
            if (err) console.log("Une ereur s'est produite")
            else that.#userId = result.insertId;
        });
    }

    /**
     * Remove users.
     */
    remove() {
        var query = "DELETE FROM Users WHERE userID = '" + this.getID();
        this.parent.query(query, function (err, result) {
            if (err) throw err;
        });
    }

    getID() {
        return this.#userId;
    }

    valid() {

    }

    generate_uniq_id() {
        var $uniq_id = '';

        for (var compt = 0; compt <= 2; compt++) {
            $uniq_id += Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return $uniq_id;
    }
}

exports.MySafeUsers = MySafeUsers;