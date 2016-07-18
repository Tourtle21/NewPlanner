'use strict';

var React = require('react');
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Index = require('./components/Index');
var App = require('./components/app')
var SignUp = require("./components/SignUp")
var FinancePlan = require("./components/FinancePlan")
var Projections = require('./components/Projections')

var routes = (
	<Route path="/" component={App}>
		<IndexRoute component={Index} />
		<Route path="/signup" component={SignUp} />
		<Route path="/financeplan" component={FinancePlan} />
		<Route path='/projections' component={Projections} />
	</Route>
);

module.exports = routes;