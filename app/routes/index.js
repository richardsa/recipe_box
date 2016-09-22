'use strict';

var path = process.cwd();
var bodyParser = require('body-parser');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var ImageHandler = require(path + '/app/controllers/imageHandler.server.js');
var RecipeHandler = require(path + '/app/controllers/recipeHandler.server.js');
// app/routes.js

module.exports = function(app, passport) {
    //body parser use from http://expressjs.com/en/api.html
    app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    var userHandler = new UserHandler();
    var imageHandler = new ImageHandler();
    var recipeHandler = new RecipeHandler();
    // route for home page
    app.get('/', function(req, res) {
        res.sendFile(path + '/public/index.html');
    });
    app.get('/testing', function(req, res) {
        res.sendFile(path + '/public/testing.html');
    });
    
    // all recipes page
     app.get('/recipes', function(req, res) {
        res.sendFile(path + '/public/recipes.html');
    });

    // login page
    app.route('/login')
        .get(function(req, res) {
            res.sendFile(path + '/public/login.html');
        });

    // route for showing the profile page
    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/profile.html');
        });
    // route for showing individual wall page
    app.route('/wall/:id')
    .get(function(req, res){
        res.sendFile(path + '/public/wall.html');
    });

    // return individual recipe page
    app.route('/recipe-api/:id')
    .get(recipeHandler.getRecipe);

    app.route('/recipe/:id')
    .get(function(req, res){
        res.sendFile(path + '/public/recipe.html');
    });
    
    app.route('/delete/:id')
    .delete(isLoggedIn, imageHandler.deleteImage);
    
    // route for returning individual wall images 
    app.route('/user/:id')
        .get(recipeHandler.getWall);
        
    // route for showing all recipes
    app.route('/recipes/all')
        .get(recipeHandler.getAll);
        
    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // facebook routes

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // return authenticated user info
    app.route('/api/:id')
        .get(isLoggedIn, function(req, res) {
            res.json(req.user.twitter);
        });

    // return upload page 
    app.route('/add-recipe')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/upload.html');
        });
    
    //image upload 
  /*  app.route('/add-recipe/api')
        .post(recipeHandler.postUpload);*/
   app.route('/add-recipe/api')
        .post(function(req, res) {
            console.log("this the body " + JSON.stringify(req.body));
            var x = req.body;
x.twitter = req.user;
          //  var poll = '/polls/' + req.body.pollID;
            recipeHandler.postUpload(x);
           // res.redirect(poll);
        });
    
    //delete tables
    app.route('/testing1')
        .get(userHandler.getDrop);
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {

        res.send(JSON.stringify({
            error: "you are not logged in."
        }));
    }
}