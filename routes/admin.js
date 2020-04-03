const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
// Guruji Model
let Guruji = require('../models/guruji');
app.use(express.static('public'));
//Admin
router.get('/admin', ensureAuthenticated, function(req, res) {
  Guruji.find({}, function(err, guruji){
    if(err){
      console.log(err);
    } else {
      res.render('admin/index', {
        title:'Guru ji Vision',
        guruji: guruji,
        layout:'layoutAdmin'
      });
    }
  });
});

// Events
router.get('/admin/events', ensureAuthenticated, function(req, res) {
  res.render('admin/event', {layout:'layoutAdmin'});
});

// Events
router.post('/admin/events', upload.single('image'), function(req, res) {
    if(req.file) {
      res.json(req.file);
  } else throw 'error';
  // res.sendFile(path.join(__dirname, `./uploads/${req.body.image}`));
  // res.render('admin/event', {layout:'layoutAdmin'});
});


router.get('/admin-guru-ji-vision', ensureAuthenticated, function(req, res) {
  res.render('admin/guru-ji-vision',{ layout:'layoutAdmin'});
});
// Add Submit POST Route
router.post('/admin-guru-ji-vision', function(req, res){
  let guruji = new Guruji();
  guruji.title = req.body.title;
  guruji.description = req.body.description;
  guruji.youtube_link = req.body.youtube_link;
  guruji.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/admin');
    }
  });
});

// Load Edit Form
router.get('/admin-guru-ji-vision/edit/:id', ensureAuthenticated, function(req, res){
  Guruji.findById(req.params.id, function(err, guruji){
    res.render('admin/edit-guru-ji-vision', {
      title:'Edit Guruji Vision',
      guruji:guruji,
      layout:'layoutAdmin'
    });
  });
});

// Update Submit POST Route
router.post('/admin-guru-ji-vision/edit/:id', function(req, res){
  let guruji = {};
  guruji.title = req.body.title;
  guruji.description = req.body.description;
  guruji.youtube_link = req.body.youtube_link;

  let query = {_id:req.params.id}

  Guruji.update(query, guruji, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/admin');
    }
  });
});

//Delete GURUJI VISION
router.get('/admin-guru-ji-vision/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }
  Guruji.findById(req.params.id)
      .then(guruji => {
        // Delete
        guruji.remove().then(() => res.redirect('/admin'));
      })
      .catch(err => res.status(404));
});


// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/admin-login');
  }
}


module.exports = router;