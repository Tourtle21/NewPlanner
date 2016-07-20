'use strict';
var React = require('react');
var browserHistory = require("react-router").browserHistory;
var Header = require('./common/header');


var About = React.createClass({
	render: function () {
		return (
			<div>
				<Header />
				<h1>About CashFlo</h1>
			</div>
		);
	}
});

module.exports = About;