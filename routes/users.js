const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User Model
let User = require('./../models/user');

// Login Form
router.get('/admin-login', function(req, res){
  res.render('admin/admin-login', {layout:'layoutLogin'});
});

// Login Process
router.post('/admin-login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/admin',
    failureRedirect:'/admin-login',
    failureFlash: true
  })(req, res, next);
});

// Register Form
router.get('/register-osgan-memeber', function(req, res){
  res.render('admin/register', {layout:'layoutAdmin'});
});

// Register Proccess
router.post('/register-osgan-memeber', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            res.redirect('/admin');
          }
        });
      });
    });
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/admin-login');
});

module.exports = router;