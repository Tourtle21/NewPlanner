'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function () {
		return (
			<div className="header">
				<div className="wrapper">
					<Link to="/"><img id="headerImage" src="../images/moneylogo.png" alt="logo" /></Link>
					<ul className="nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about-page">About</Link></li>
						<li><Link to="/todos-page">Todo Page</Link></li>
						<li><Link to="/manage-todo">Add Todo</Link></li>
					</ul>
				</div>
				<hr />
			</div>
		);
	}
});

module.exports = Header;
