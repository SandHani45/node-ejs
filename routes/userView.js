const express = require('express');
const router = express.Router();
const app = express();
// Guruji Model
let Guruji = require('../models/guruji');

// index page 
router.get('/', function(req, res) {
  res.render('pages/index',{layout:'layoutUser'});
});

//what-are-we
router.get('/what-are-we', function(req, res) {
  res.render('pages/what-are-we',{layout:'layoutUser'});
});

// what-is-on-our-cross-wire
router.get('/what-is-on-our-cross-wire', function(req, res) {
  res.render('pages/what-is-on-our-cross-wire', {layout:'layoutUser'});
});
// forth-coming-events
router.get('/forth-coming-events', function(req, res) {
  res.render('pages/forth-coming-events',{layout:'layoutUser'});
});

// gallery
router.get('/gallery', function(req, res) {
  res.render('pages/gallery', {layout:'layoutUser'});
});

// our-inspirations
router.get('/our-inspirations', function(req, res) {
  res.render('pages/our-inspirations',{layout:'layoutUser'});
});

// join-us
router.get('/participate', function(req, res) {
  res.render('pages/join-us',{layout:'layoutUser'});
});

module.exports = router;