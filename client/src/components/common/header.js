'use strict';

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
	render: function () {
		return (
			<div className="header">
				<div className="wrapper">
					<Link to="/"><img id="headerImage" src="../images/moneylogonew2.png" alt="logo" /></Link>
					<ul className="nav">
						<li><Link to="/">Home</Link></li>
						<li><Link to="/about">About Us</Link></li>
						<li><Link to="/financeplan">Financial Plan</Link></li>
						<li><Link to="/projections">Projections</Link></li>
					</ul>
				</div>
				<hr />
			</div>
		);
	}
});

module.exports = Header;