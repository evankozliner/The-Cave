var Post = require('../models/post.js'),
    AWS = require('aws-sdk');

//Fetches image url's from the s3 bucket 'thecave' for use on the index page.
//TODO: Rename the bucket and this project to "Here's to Saturday".
exports.index = function(req, res, app) {
  s3Path = "https://s3-us-west-2.amazonaws.com/thecave/";
  var s3 = new AWS.S3(),
      posts = [];
  //Set up the AWS config.
  //Uses a config file for dev and environment variables for prod.
  if (process.env.NODE_ENV !== 'production') {
    AWS.config.loadFromPath('./credentials.json');
  }

  s3.listObjects({Bucket: 'thecave', Prefix: 'sub-wallpapers'}, function(err, data) {
    if (err) { console.log("Error:", err); }
    else {
      for(var index in data.Contents) {
        key = data.Contents[index]['Key'];
        if(key) {
          posts.push( s3Path + key );
        }
        if(Object.keys(data.Contents).length === posts.length) {
          posts = posts.slice(1, posts.length);
          res.render('index', {posts: posts});
        }
      }
    }
  });
};

exports.about = function(req, res) {
  res.render('about');
}
