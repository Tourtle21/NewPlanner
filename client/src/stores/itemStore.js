'use strict';

var Dispatcher = require('../dispatcher/Dispatcher')
var EventEmitter = require('events');
var _ = require('lodash');
var goal = {
	goal: 0,
	months: 0,
	net: 0
}
var _items = [
			[{
				id: 0,
				type: "Job",
				amount: 800
			},
			{
				id: 1,
				type: "Alowence",
				amount: 1500
			},
			{
				id: 2,
				type: "Investment",
				amount: 50
			}],
			[{
				id: 0,
				type: "House Payment",
				amount: 550
			},
			{
				id: 1,
				type: "Phone Bills",
				amount: 100
			},
			{
				id: 2,
				type: "Groceries",
				amount: 75
			}]
]
var item;
var ItemStore = Object.assign({}, EventEmitter.prototype, {
	// addChangeListener: function (callback) {
	// 	this.on(CHANGE_EVENT, callback);
	// },

	// removeChangeListener: function (callback) {
	// 	this.removeListener(CHANGE_EVENT, callback);
	// },

	// emitChange: function () {
	// 	this.emit(CHANGE_EVENT);
	// },
	getData: function () {
		return _items;
	},
	getAllIncomes: function () {
		return _items[0];
	},
	getAllExpenses: function () {
		return _items[1];
	},
	getGoal: function () {
		return goal.goal;
	},
	getMonths: function () {
		return goal.months;
	},
	getNet: function () {
		return goal.net;
	},
	getFullItem: function () {
		return item;
	}
})

Dispatcher.register(function (action, type) {
	switch (action.actionType) {
		case "create":
		console.log(action.type)
		if (!isNaN(action.type)) {
			_items[action.type].push({
				id: _items[action.type].length,
				type: "type",
				amount: 0
			})
		}
		break;


		// ItemStore.emitChange();

		case "update":
		if (action.type == "income") {
			var index = 0;
		}
		else {
			var index = 1;
		}
		var existingItem = _.find(_items[index], {id: action.item.id})
		var existingItemIndex = _.indexOf(_items[index], existingItem);
		_items[index].splice(existingItemIndex, 1, action.item)
		// ItemStore.emitChange();
		break;
		case "goal":
		goal.goal = action.goal
		goal.months = action.months
		goal.net = action.net
		break;
		case "delete":
		_items[action.number].splice([action.id], 1)
		for (var i = action.id; i < _items[action.number].length; i++) {
			_items[action.number][i].id -= 1
		}
		break;
		case "initial":
		_items = JSON.parse(action.item.data)
		item = action.item

	}
})

module.exports = ItemStore;
