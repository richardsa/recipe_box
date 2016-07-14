'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	twitter: {
		id: String,
		token: String,
		username: String,
      displayName: Number
	},
   nbrClicks: {
      clicks: Number
   }
});


