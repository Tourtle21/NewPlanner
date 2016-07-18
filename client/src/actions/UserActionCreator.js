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
	}
}

module.exports = UserActionCreator
