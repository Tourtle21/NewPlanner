'use strict';

var mongoose = require('mongoose');

var MoneySchema = new mongoose.Schema({
	//user: {type: mongoose.Schema.Types.ObjectId, required: true, ref:'User'},
	id: {type: String, required: true},
	data: {type: String, required: true},
	updatedAt: Date
});

MoneySchema.pre('save', function (done){
	this.updatedAt = new Date;
	done();
});
module.exports = mongoose.model('Money', MoneySchema);
