'use strict';
var path = process.cwd();
var Users = require('../models/users.js');
var Recipes = require('../models/recipes.js');

function recipeHandler() {
  //add recipe
  this.postUpload = function(req, res) {
    var twitterID = req.user.twitter.id;
    var username = req.user.twitter.username;
    var recipeName = req.query.recipeName;
    var recipeIngredients = req.query.recipeIngredients;
    var recipeDirections = req.query.recipeDirections;
    
    Recipes.collection.insert({
      username: username,
      twitterID: twitterID,
      recipeIngredients: recipeIngredients,
      recipeName: recipeName,
      recipeDirections: recipeDirections
    }, function(err, updatedResult) {
      if (err) {
        throw err;
      }
      
      res.send(updatedResult);
    });
  };

  // return all community images
  this.getAll = function(req, res) {

    Recipes
      .find({}).sort({_id:-1})
      .lean().exec(function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
            console.log(result);
          res.json(result);
        } else {
          res.send({
            error: "No recipes in the community at this time"
          });
        }
      });
  };
  // return individual recipe
  this.getRecipe = function(req, res) {
    var id = req.params.id;
    Recipes
      .find({
        _id: id
      }).sort({_id:-1})
      .lean().exec(function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.json(result);
        } else {
          res.send({
            error: "No recipes in the community at this time"
          });
        }
      });
  };
  // return user wall
  this.getWall = function(req, res) {
    var id = req.params.id;
  
    Recipes
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
            error: "No recipes in the community at this time"
          });
        }
      });
  };
  
  this.deleteImage = function(req, res){
    var twitterID = req.user.twitter.id;
     var id = req.params.id;
     Recipes.findOne({
         twitterID: twitterID,
         _id: id

       },
       function(err, recipe) {
         if (err) {
           throw err;
         }
         if (recipe) {
           recipe.remove(function(err) {
             if (err) {
               throw err;
             }
             res.send("recipe deleted");
           });
         }
       });
  };

}


module.exports = recipeHandler;