'use strict';
var path = process.cwd();
var Users = require('../models/users.js');
var Images = require('../models/images.js');

function userHandler() {
  
  
    // quick and dirty function to clear tables
    this.getDrop = function(req, res) {
      
        Users.remove(function(err, p) {
            if (err) {
                throw err;
            } 
        });
        
        Images.remove(function(err, p) {
            if (err) {
                throw err;
            } else {
                res.send("All Tables Cleared");
            }
        });
    };

}


module.exports = userHandler;