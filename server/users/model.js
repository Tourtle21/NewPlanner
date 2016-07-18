var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
	name: {type: String, reqired: true},
	email: {type: String, required: true, unique: true, lowercase: true, trim: true},
	passwordHash: {type:String, required: true},
	createdAt: {type:Date, default: Date.now},
	updatedAt: Date
});

UserSchema.virtual('password')
	.set(function (password)
	{
		this.passwordHash = bcrypt.hashSync(password, 10);
	});



UserSchema.methods.toJSON = function()
{
	var user = this.toObject()
	delete user.passwordHash
	return user
}



UserSchema.methods.verifyPassword = function (plainpassword)
{
	return bcrypt.compareSync(plainpassword, this.passwordHash);
};



UserSchema.pre('save', function(done)
{
	this.updatedAt = new Date
	done()
});

module.exports = mongoose.model('User', UserSchema)
