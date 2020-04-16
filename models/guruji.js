let mongoose = require('mongoose');

// Guruji Schema
let gurujiSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  youtube_link:{
    type: String
  },
  image:{
    type: String
  }
});

let Guruji = module.exports = mongoose.model('Guruji', gurujiSchema);