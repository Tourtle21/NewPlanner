'use strict';

var Dispatcher = require('../dispatcher/Dispatcher')
var EventEmitter = require('events');
var _ = require('lodash');
var goal = {
	goal: 0,
	months: 1,
	net: 0
}
var CHANGE_EVENT = 'change';
var _items = [
			[{
				id: 0,
				type: "Job",
				amount: 1600
			},
			{
				id: 1,
				type: "Investment",
				amount: 400
			},
			{
				id: 2,
				type: "Odd-Jobs",
				amount: 300
			}],
			[{
				id: 0,
				type: "House Payment",
				amount: 700
			},
			{
				id: 1,
				type: "Phone Bills",
				amount: 100
			},
			{
				id: 2,
				type: "Groceries",
				amount: 200
			}],
			{
				goal: 0,
				months: 0
			}
]
var item;
var ItemStore = Object.assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		console.log("changed")
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	emitChange: function () {
		this.emit(CHANGE_EVENT);
	},
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
	getFullItem: function (goal, months) {
		return item;
	},
	getAmount: function () {
		return JSON.parse(item.data)[2].goal
	},
	getMonth: function () {
		return JSON.parse(item.data)[2].months
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
		item.data = JSON.stringify(_items)
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
		item.data = JSON.stringify(_items)
		// ItemStore.emitChange();
		break;
		case "goal":
		goal.goal = action.goal
		goal.months = action.months
		goal.net = action.net
		console.log(JSON.parse(item.data)[2].goal)
		_items[2].goal = goal.goal
		_items[2].months = goal.months
		item.data = JSON.stringify(_items)
		console.log(item)
		break;
		case "delete":
		_items[action.number].splice([action.id], 1)
		for (var i = action.id; i < _items[action.number].length; i++) {
			_items[action.number][i].id -= 1
		}
		item.data = JSON.stringify(_items)
		break;
		case "initial":
		_items = JSON.parse(action.item.data)
		item = action.item
		ItemStore.emitChange()
	}
})

module.exports = ItemStore;
