'use strict';

var path = process.cwd();
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var ImageHandler = require(path + '/app/controllers/imageHandler.server.js');
// app/routes.js

module.exports = function(app, passport) {
    var userHandler = new UserHandler();
    var imageHandler = new ImageHandler();

    // route for home page
    app.get('/', function(req, res) {
        res.sendFile(path + '/public/index.html');
    });
    app.get('/testing', function(req, res) {
        res.sendFile(path + '/public/testing.html');
    });


    app.route('/login')
        .get(function(req, res) {
            res.sendFile(path + '/public/login.html');
        });

    // route for showing the profile page
    app.route('/profile')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/profile.html');
        });
        
    // route for showing all images 
    app.route('/images/all')
        .get(imageHandler.getAll);
        
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
    app.route('/upload')
        .get(isLoggedIn, function(req, res) {
            res.sendFile(path + '/public/upload.html');
        });
    
    //image upload 
    app.route('/upload/api')
        .post(imageHandler.postUpload);
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