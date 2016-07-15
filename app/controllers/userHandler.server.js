'use strict';
var path = process.cwd();
var Users = require('../models/users.js');

function userHandler() {
    //upload image 
    this.postUpload = function(req, res){
        var twitterID = req.user.twitter.id;
        var imageCaption = req.query.imageCaption;
        var imageURL = req.query.imageURL;
        console.log("twitterID " + twitterID + "imageCaption " + imageCaption + "imageURL " + imageURL );
        res.end();
    };
  
    // quick and dirty function to clear tables
    this.getDrop = function(req, res) {
      
        Users.remove(function(err, p) {
            if (err) {
                throw err;
            } else {
                res.send("User Table Cleared");
            }
        });
    };

}


module.exports = userHandler;