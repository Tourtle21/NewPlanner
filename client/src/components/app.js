'use strict';

var React = require('react');


var App = React.createClass({
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