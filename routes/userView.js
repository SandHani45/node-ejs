const express = require('express');
const router = express.Router();
const app = express();
const { omit } = require("lodash");
var nodemailer = require('nodemailer');
// Guruji Model
let Guruji = require('../models/guruji');

// index page 
router.get('/', function(req, res) {
  res.render('pages/index',{layout:'layoutUser'});
});

//what-are-we
router.get('/who-are-we', function(req, res) {
  res.render('pages/who-are-we',{layout:'layoutUser'});
});

// what-is-on-our-cross-wire
router.get('/what-is-on-our-cross-wire', function(req, res) {
  res.render('pages/what-is-on-our-cross-wire', {layout:'layoutUser'});
});
// forth-coming-events
router.get('/forth-coming-events', function(req, res) {
  res.render('pages/forth-coming-events',{layout:'layoutUser'});
});

// Photo-gallery
router.get('/photo-gallery', function(req, res) {
  res.render('pages/photo-gallery', {layout:'layoutUser'});
});
// Video- gallery
router.get('/video-gallery', function(req, res) {
  res.render('pages/video-gallery', {layout:'layoutUser'});
});

// Video- gallery
router.get('/audio-gallery', function(req, res) {
  res.render('pages/audio-gallery', {layout:'layoutUser'});
});

// our-inspirations
router.get('/our-inspirations', function(req, res) {
  res.render('pages/our-inspirations',{layout:'layoutUser'});
});

// join-us
router.get('/join-us', function(req, res) {
  res.render('pages/join-us',{layout:'layoutUser'});
});

// thanks
router.get('/thanks', function(res,req){
  res.render('pages/thanks',{layout:'layoutUser'});
})

//Contact Us
router.get('/contact-us', function(req, res) {
  res.render('pages/contact-us',{layout:'layoutUser'});
});

const transport = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user:  'alessandro.luettgen7@ethereal.email', // generated ethereal user
      pass: 'Ec7uqqpU8TvJmS1QzV' // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/contact-us', function(req, res) {
  let contact = {};
  contact.firstName = req.body.firstName;
  contact.message = req.body.message;
  contact.email = req.body.email;
  contact.lastName = req.body.lastName
  var mailOptions = {
    from: 'sandhani.sk45@gmail.com',
    to: req.body.email,
    subject: `trying to contact ${req.body.firstName} `,
    text: req.body.message
  };
  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.render('pages/thanks',{layout:'layoutUser'});
    }
  });
});

module.exports = router;