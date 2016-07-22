'use strict';

var Dispatcher = require("../dispatcher/Dispatcher")
var API = require("../helpers/api")
var UserStore = require("../stores/userStore")

var UserActionCreator = {

	createUser: function (email, password, name, ifnew) {
		var newUserPromise = API.createUser(email, password)

		newUserPromise
			.then(function (newTodo) {
				Dispatcher.dispatch({
					actionType: "setId",
					data: newTodo,
					ifnew: ifnew
				})
			})
			.fail(function (err) {
				Dispatcher.dispatch({
					actionType: "userFail",
					err: err,
				})
			})
	},
	setifnew: function (ifnew) {
		Dispatcher.dispatch({
			actionType: "setifnew",
			ifnew: ifnew
		})
	},
	getUsers: function () {
		var usersPromise = API.getAllUsers();

		usersPromise
			.then(function (users) {
				Dispatcher.dispatch({
					actionType: "getUsers",
					data: {
						users: users
					}
				})
			})
	},
	getUser: function (username, password) {
		var usersPromise = API.getUser(username, password);

		usersPromise
			.then(function (id) {
				if (id == "wrong") {
					Dispatcher.dispatch({
						actionType: "wrong",
					})
				} else {
					Dispatcher.dispatch({
						actionType: "setId",
						data: {
							_id: id
						}
					})
				}
			})
	},
	removeError: function () {
		Dispatcher.dispatch({
			actionType: "removeError",
		})
	},
	deleteUsers: function () {
		API.deleteUsers()
	}
}

module.exports = UserActionCreator
