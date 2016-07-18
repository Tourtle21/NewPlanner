'use strict';

var Money = require('./model');

module.exports = {
	create: createMoney,
	index: indexMoney,
	show: showMoney,
	update: updateMoney,
	delete: deleteMoney,
	user: findMoneyByUser,
};

function createMoney(req, res)
{
	console.log('creating money')
	Money.create({
		//user: req.body.user,
		data: req.body.data,
		id: req.body.id
	},
	function (err, item)
	{
		if (err) return reportError(err, res);
		res.status(201).json(item);
	});
}

function deleteMoney(req, res)
{
	findMoney(req, res, function (item)
	{
		item.remove(function (err)
		{
			if(err) return reportError(err, res)
			res.status(204).end()
		})

	});
}

function indexMoney(req, res)
{
	Money.find(function (err, collection)
	{

		res.json(collection)
	});
}

function showMoney(req, res)
{
	findMoneyByUser(req, res, function (item)
	{
		res.json(item)
	});
}

function updateMoney(req, res)
{
 	findMoney(req, res, function(item)
 	{
 		item.data = req.body.data

		item.save(function(err)
		{
			if(err) return reportError(err, res)

			res.json(item)
		})
 	});
}
function findMoney(req, res, success)
{
	var id = req.params.id
	Money.findById(id, function (err, item)
	{
		if (err) return reportError(err, res)

		if (!item)
		{
			res.status(404).json({
				error: 'Could not find item with that id'
			})
		}
		else
		{
			success(item)
		}
	})
}
function findMoneyByUser(req, res, success) {
	Money.find(function (err, collection)
	{
		if (err) return reportError(err, res)
		for (var i = 0; i < collection.length; i++) {
			if (req.params.id == collection[i].id) {
				res.json(collection[i])
				return
			}
		}
		res.status(404).json ({
			error: "I could not find item with that id"
		})

	});
}

function reportError(err, res)
{
	res.status(500).json
			({
				error: err.toString()
			})
}
