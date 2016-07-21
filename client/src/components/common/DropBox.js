var React = require('react');
var Chart = require('chart.js')



var DropBox = React.createClass({

	render: function () {
		return (
			<div id="DropBox">
				<select>
					<option value="1">1 Month</option>
					<option value="2">2 Months</option>
					<option value="3">3 Months</option>
					<option value="4">4 Months</option>
					<option value="5">5 Months</option>
					<option value="6">6 Months</option>
					<option value="7">7 Months</option>
					<option value="8">8 Months</option>
					<option value="9">9 Months</option>
					<option value="10">10 Months</option>
					<option value="11">11 Months</option>
					<option value="12">12 Months</option>
				</select>
			</div>
		)
	}
})

module.exports = DropBox;
