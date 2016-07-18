'use strict';
var path = process.cwd();
var Users = require('../models/users.js');
var Images = require('../models/images.js');

function imageHandler() {
    //upload image 
    this.postUpload = function(req, res){
        var twitterID = req.user.twitter.id;
        var imageCaption = req.query.imageCaption;
        var imageURL = req.query.imageURL;
        console.log("twitterID " + twitterID + "imageCaption " + imageCaption + "imageURL " + imageURL );
        Images.collection.insert({
          twitterID: twitterID ,
          imageCaption: imageCaption,
          likes: 0,
          imageURL: imageURL,
        }, function(err, updatedResult) {
          if (err) {
            throw err;
          }
          console.log(JSON.stringify(updatedResult));
          res.send(updatedResult);
        });
    };
  
    // return all community images
  this.getAll = function(req, res) {

    Images
      .find({})
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

}


module.exports = imageHandler;