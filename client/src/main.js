'use strict';


var $, jQuery;
$ = jQuery = require('jquery');
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var routes = require('./routes');

ReactDOM.render(
	<Router history={browserHistory}>
	 	{routes}
	</Router>

	, document.getElementById('app')
);