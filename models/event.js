let mongoose = require('mongoose');

// Article Schema
let eventSchema = mongoose.Schema({
  title:{
    type: String
  },
  description:{
    type: String
  },
  city:{
    type: String
  },
  image:{
    type: String
  }
});

let Event = module.exports = mongoose.model('Event', eventSchema);