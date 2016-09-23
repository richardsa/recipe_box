'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Recipe = new Schema({
	twitterId: {type: String},
	username: {type: String},
	recipeName: {type: String},
	recipeIngredients: {type: String},
	recipeDirections: {type: String},
});

module.exports = mongoose.model('Recipe', Recipe);
