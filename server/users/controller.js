var User = require('./model');
var bcrypt = require('bcryptjs');

module.exports = {
	create: createUser,
	get: getUsers,
	getUser: getUser,
	delete: deleteAll,
};

function createUser(req, res)
{
	console.log('we are here')
	var name = req.body.name
	var email = req.body.email
	var password = req.body.password

	User.create(
	{
		name: name,
		email: email,
		password: password
	},
	function(err, user)
	{
		if (err) return reportError(err, res)

		res.status(201).json(user)
	})
}

function reportError(err, res)
{
	res.status(500).json
			({
				error: err.toString()
			})
}
function getUsers(req, res)
{
	User.find(function (err, collection)
	{
		if (err) return reportError(err, res)

		res.json(collection)
	})
}
function getUser(req, res)
{
	User.find(function (err, collection)
	{
		if (err) return reportError(err, res)
		for (var i = 0; i < collection.length; i++) {
			if (req.params.username == collection[i].email) {
				if (bcrypt.compareSync(req.params.password, collection[i].passwordHash)) {
					console.log("same")
					res.json(collection[i]._id)
					return
				}
			}
		}
		res.json("wrong")
	})
}
function deleteAll(req, res)
{
	User.find(function (err, collection) {
		for (var i = 0; i < collection.length; i++) {
			collection[i].remove(function (req, res) {
				console.log("deleted")
			})
		}
	})
}
