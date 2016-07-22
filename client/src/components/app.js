'use strict';

var React = require('react');
var ItemActionCreator = require("../actions/ItemActionCreator")
var UserActionCreator = require("../actions/UserActionCreator")


var App = React.createClass({
	componentWillMount: function () {
		// ItemActionCreator.deleteItems()
		// UserActionCreator.deleteUsers()
	},
	render: function () {
		return (
			<div>
				<div className="container">
					{this.props.children}
				</div>
			</div>
		);
	}
});

module.exports = App;
