const {ReactSession} = require("react-client-session")
const { MySafeAccount } = require("./MySafeAccount.js");
const { MySafeComponents } = require("./MysafeComponent.js");
const {v4 : uuidv4} = require('uuid');

const signinHandler = (req, res) => {
    // get users credentials from the JSON body
    const { username, password } = req.body
    if (!username) {
        // If the username isn't present, return an HTTP unauthorized code
        res.status(401).end()
        return
    }

    // generate a random UUID as the session token
    const sessionToken = uuidv4();

    // create a session containing information about the user and expiry time
    const session = new MySafeAccount({
        username: username,
        password: password,
        operation: "login",
        request: res
    });

    session.open();

    ReactSession.set("session_token", sessionToken);
    ReactSession.set(sessionToken, session);
}

const signupHandler = (req, res) => {
    // get users credentials from the JSON body
    const { username, password, firstname, lastname, adress, role, birthday, email } = req.body
    if (!username || !password || !birthday) {
        // If the username isn't present, return an HTTP unauthorized code
        res.status(401).end()
        return
    }

    // generate a random UUID as the session token
    const sessionToken = uuidv4()

    // create a session containing information about the user and expiry time
    const session =  new MySafeAccount({
        firstname: firstname,
        lastname: lastname,
        birthday: birthday, // year/month/day
        mail: email,
        adress: adress,
        username: username,
        password: password,
        role: role,
        type: "none",
        dateNow: new Date(),
        expire: 12,
        operation: "signup",
        request: res
    });

    // and the value as the UUID we generated. We also set the expiry time
    ReactSession.set("session_token", sessionToken);
    ReactSession.set(sessionToken, session);
}

const createComponent = (req, res) => {
    // get users credentials from the JSON body
    const { name, type, categorie, path, folderName, folderPath, status } = req.body;
    var component = new MySafeComponents();
    component.setName(name);
    component.setPath(path);
    component.setType(type);
    component.setCategorie(categorie);
    component.setFolderName(folderName);
    component.setFolderPath(folderPath);
    component.setStatus(status);
    component.setRequest(req);
    component.setResponse(res);
    component.create();
}

const createFolder = (req, res) => {
    const { path, folderName, status } = req.body;
    var component = new MySafeComponents();
    component.setStatus(status);
    component.setRequest(req);
    component.setResponse(res);
    component.createFolder(path, folderName);
}

exports.signinHandler = signinHandler;
exports.signupHandler = signupHandler;
exports.createComponent = createComponent;
exports.createFolder = createFolder;