const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const multer = require('multer');
// Guruji Model
let Guruji = require('../models/guruji');
let Event = require('../models/event');
app.use(express.static('public'));


/** Storage Engine */
const storageEngine = multer.diskStorage({
  destination: './public/files',
  filename: function(req, file, fn){
    fn(null,  new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname));
  }
}); 
const upload =  multer({
  storage: storageEngine,
  limits: { fileSize:900000 },
  fileFilter: function(req, file, callback){
    validateFile(file, callback);
  }
}).single('image');

var validateFile = function(file, cb ){
 var allowedFileTypes = /jpeg|jpg|JPG|png|PNG|gif/;
  const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType  = allowedFileTypes.test(file.mimetype);
  if(extension && mimeType){
    return cb(null, true);
  }else{
    cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
  }
}

//Admin
router.get('/admin', ensureAuthenticated, function(req, res) {
  Event.find({}, function(err, event){
    if(err){
      console.log(err);
    } else {
      res.render('admin/index', {
        title:'Event',
        event: event,
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
router.post('/admin/events', function(req, res) {
  upload(req, res,(error) => {
    if(error){
      console.log(error)
       res.redirect('/admin/error');
    }else{
      if(req.file == undefined){
        
        res.redirect('/admin/error');
      }else{
           
          /**
           * Create new record in mongoDB
           */
          var fullPath = "files/"+req.file.filename;
          var document = {
            image:     fullPath, 
            title:   req.body.title,
            description: req.body.description,
            city: req.body.city
          };
          console.log(document)
        var event = new Event(document); 
        event.save(function(error){
          if(error){ 
            throw error;
          } 
          res.redirect('/admin');
       });
    }
  }
});
});
router.get('/admin/error', ensureAuthenticated, function(req, res) {
  res.render('admin/error',{ layout:'layoutAdmin'});
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
  Event.findById(req.params.id, function(err, event){
    res.render('admin/edit-guru-ji-vision', {
      title:'Edit the Event',
      event:event,
      layout:'layoutAdmin'
    });
  });
});

// Update Submit POST Route
router.post('/admin-guru-ji-vision/edit/:id', function(req, res){
  let event = {};
  event.title = req.body.title;
  event.city = req.body.city;
  event.description = req.body.description;
  event.image = req.body.image;

  let query = {_id:req.params.id}

  Event.update(query, event, function(err){
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
  Event.findById(req.params.id)
      .then(event => {
        // Delete
        event.remove().then(() => res.redirect('/admin'));
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