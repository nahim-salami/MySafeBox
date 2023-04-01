const {ReactSession} = require("react-client-session")
import * as msfb from './MysafeAccount';
const { MySafeComponents } = require("./MysafeComponent");
const {v4 : uuidv4} = require('uuid');
const MySafeAccount = msfb.MySafeAccount;

//ReactSession.setStoreType("cookie");
const signinHandler = (req, res) => {
    // get users credentials from the JSON body
    const { username, password } = req.body
    if (!username) {
        // If the username isn't present, return an HTTP unauthorized code
        res.status(401).end()
        return
    }

    // generate a random UUID as the session token
    var sessionToken = uuidv4();

    // create a session containing information about the user and expiry time
    var session = new MySafeAccount({
        username: username,
        password: password,
        operation: "login",
        request: res
    });
    
    ReactSession.set("session_token", sessionToken);
    ReactSession.set(sessionToken, session);

    session.open();
}

const signupHandler = (req, res) => {
    // get users credentials from the JSON body
    const { username, password, firstname, lastname, adress, role, birthday, email } = req.body;

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
    ReactSession.set("kkk", sessionToken);
   // ReactSession.set(sessionToken, JSON.stringify(session));

    session.open();
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

const isLogin = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      log = userAccount.isConnect();
    }

    res.send(log).end();
}

const getComponentList = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      if(userAccount.isConnect()) {
        var component = new MySafeComponents();
        component.setRequest(req);
        component.setResponse(res);
        component.list();
      }
    }
    else {
        res.send(log).end();
    }
}

const getFolderList = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      if(userAccount.isConnect()) {
        var component = new MySafeComponents();
        component.setRequest(req);
        component.setResponse(res);
        component.list('folder');
      }
    }
    else {
        res.send(log).end();
    }
}

const removeComponent = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      if(userAccount.isConnect()) {
        const { component_id, path } = req.body
        var component = new MySafeComponents();
        component.setRequest(req);
        component.setResponse(res);
        component.remove(component_id, path);
      }
    }
    else {
        res.send(log).end();
    }
}

const removeFolder = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      if(userAccount.isConnect()) {
        const { component_id, path } = req.body
        var component = new MySafeComponents();
        component.setRequest(req);
        component.setResponse(res);
        component.removeFolder(component_id, path);
      }
    }
    else {
        res.send(log).end();
    }
}

const getUserData = (req, res) => {
    var session_tokens = ReactSession.get("session_token");
    var log = false;
    
    if(typeof session_tokens !== "undefined")
    {
      var userAccount = ReactSession.get(session_tokens);
      if(userAccount.isConnect()) {
        log = userAccount.getAllData();
      }
    }
    res.send(log).end();
}

exports.signinHandler = signinHandler;
exports.signupHandler = signupHandler;
exports.createComponent = createComponent;
exports.createFolder = createFolder;
exports.isLogin = isLogin;
exports.getComponentList = getComponentList;
exports.getFolderList = getFolderList;
exports.removeComponent = removeComponent;
exports.removeFolder = removeFolder;
exports.getUserData = getUserData;