'use strict';

var ajax = require('./ajax');

module.exports = {
	getAllMoney: getAllMoney,
	createMoney: createMoney,
	deleteMoney: deleteMoney,
	updateMoney: updateMoney,
	createUser: createUser,
	getUser: getUser,
	deleteUsers: deleteUsers
}


function getAllMoney (_id) {
	var url = '/money/' + _id;
	var data = {};
	var type = 'GET';
	return ajax(url, data, type);
}

function createMoney (money, id) {
	var url = '/money';
	var data = {data: JSON.stringify(money) , id: id};
	var type = "POST"
	return ajax(url, data, type);
}

function deleteMoney (money) {
	var url = '/money';
	var data = {};
	var type = 'DELETE';

	return ajax(url, data, type);
}
function deleteUsers (money) {
	var url = '/users';
	var data = {};
	var type = 'DELETE';

	return ajax(url, data, type);
}
function updateMoney (money) {
	var url = '/money/' + money._id;
	var data = money;
	var type = 'PUT';

	return ajax(url, data, type);
}
function createUser (email, password, name) {
	var url = "/users"
	var data = {
		email: email,
		password: password,
		name: name
	}
	var type = "POST";

	return ajax(url, data, type)
}
function getAllUsers () {
	var url = "/users"
	var data = {}
	var type = "GET";

	return ajax(url, data, type)
}
function getUser(username, password) {
	var url = "/users/" + username+"/"+password
	var data = {};
	var type = "GET"
	return ajax(url, data, type)
}
