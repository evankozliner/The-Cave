var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  picture: String,
  title: String,
  body: String,
  created_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);
