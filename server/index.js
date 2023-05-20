const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const {
    signinHandler,
    signupHandler,
    createComponent,
    createFolder,
    isLogin,
    getComponentList,
    removeComponent,
    removeFolder,
    getFolderList,
    getUserData
} = require('./handlers');

const cors = require("cors");
const port = 5000;
const app = express();
app.use(bodyParser.json({limit: '250mb'}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());
app.post('/signin', signinHandler);
app.post('/signup', signupHandler);
app.post('/component', createComponent);
app.post('/createFolder', createFolder);
app.get('/checklogin', isLogin);
app.post('/componentlist', getComponentList);
app.post('/folderList', getFolderList);
app.post('/removeComponent', removeComponent);
app.post('/removeFolder', removeFolder);
app.post('/userData', getUserData);

app.listen(port, () => console.log(`Listening on port ${port}`));
