'use strict';

var $ = require('jquery');

var ajax = function (url, data, type) {
	var method = type || 'POST';
	console.log(method)
	return $.ajax({
		url: 'http://localhost:9050' + url,
		dataType: 'json',
		contentType: 'application/json',
		type: method,
		data: JSON.stringify(data)
	});
};

module.exports = ajax;
