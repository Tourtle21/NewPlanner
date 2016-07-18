var React = require('react');
var Chart = require('chart.js')



var DropBox = React.createClass({

	render: function () {
		return (
			<div>
				<select>
  					<option value="1">1 Month</option>
					<option value="3">3 Months</option>
					<option value="6">6 Months</option>
					<option value="12">12 Months</option>
				</select>
			</div>
		)
	}
})

module.exports = DropBox;
