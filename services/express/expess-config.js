'use strict';

const express = require('express');
const fileUpload = require('express-fileupload');
const sessions = require('express-session');
const es6Renderer = require('express-es6-template-engine');
const credentials = require('../../configs/user');
const password = credentials.password;
const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(sessions({
  secret: credentials.secret,
  saveUninitialized:true,
  resave: false
}));

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');
app.use(express.static('./views'));
app.use(fileUpload());

module.exports = { app, password };