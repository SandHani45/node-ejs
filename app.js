const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
const serverless = require("serverless-http");
const { check, validationResult } = require('express-validator');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const fs = require("fs");
const app = express();

// Mango config
const db = require("./config/keys").mongoURI;
// MangoDB Connet
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongodb conneneted"))
  .catch(err => console.log(err));

// Bring in Models
let Guruji = require('./models/guruji');

// view engine setup
app.use(expressLayouts);
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layoutUser', 'layoutAdmin', 'layoutRegister', 'layoutLogin');
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Route Files
let users = require('./routes/users');
let admin = require('./routes/admin');
let userView = require('./routes/userView');
app.use('/', users);
app.use('/', admin);
app.use('/', userView);

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
module.exports = app;
module.exports.handler = serverless(app);
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`server ruinnding ${port}`));