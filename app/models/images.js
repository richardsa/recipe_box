'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	twitterId: {type: String},
	imageURL: {type: String},
	imageCaption: {type: String},
	likes: {type: Number},
});

module.exports = mongoose.model('Image', Image);
