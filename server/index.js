const { MySafeComponents } = require("./MySafeComponent.js");

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const { signinHandler, signupHandler, createComponent, createFolder } = require('./handlers');
const cors = require("cors");
const app = express();
app.use(bodyParser.json({limit: '250mb'}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());
app.post('/signin', signinHandler);
app.post('/signup', signupHandler);
app.post('/component', createComponent);
app.post('/createFolder', createFolder);

app.listen(3001);

// var comp = new MySafeComponents();
// comp.create();
