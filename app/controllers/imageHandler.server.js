'use strict';
var path = process.cwd();
var Users = require('../models/users.js');
var Images = require('../models/images.js');

function imageHandler() {
  //upload image 
  this.postUpload = function(req, res) {
    var twitterID = req.user.twitter.id;
    var username = req.user.twitter.username;
    var imageCaption = req.query.imageCaption;
    var imageURL = req.query.imageURL;
    
    Images.collection.insert({
      username: username,
      twitterID: twitterID,
      imageCaption: imageCaption,
      likes: 0,
      imageURL: imageURL,
    }, function(err, updatedResult) {
      if (err) {
        throw err;
      }
      
      res.send(updatedResult);
    });
  };

  // return all community images
  this.getAll = function(req, res) {

    Images
      .find({}).sort({_id:-1})
      .lean().exec(function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.json(result);
        } else {
          res.send({
            error: "No images in the community at this time"
          });
        }
      });
  };
  // return user wall
  this.getWall = function(req, res) {
    var id = req.params.id;
  
    Images
      .find({
        twitterID: id
      }).sort({_id:-1})
      .lean().exec(function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.json(result);
        } else {
          res.send({
            error: "No images in the community at this time"
          });
        }
      });
  };
  
  this.deleteImage = function(req, res){
    var twitterID = req.user.twitter.id;
     var id = req.params.id;
     Images.findOne({
         twitterID: twitterID,
         _id: id

       },
       function(err, image) {
         if (err) {
           throw err;
         }
         if (image) {
           image.remove(function(err) {
             if (err) {
               throw err;
             }
             res.send("image deleted");
           });
         }
       });
  }

}


module.exports = imageHandler;