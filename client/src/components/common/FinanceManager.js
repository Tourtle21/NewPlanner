var React = require('react');
var Link = require('react-router').Link;
var hashHistory = require("react-router").hashHistory
var TextInput = require("./TextInput")
var FinancePlan = React.createClass({




	render: function () {
		var amount = 0;

		var createTodoRow = function (number, incomes) {
			amount += incomes.amount
			return (
				<tr key={incomes.id * (number + 1)}>
					<td>
						<button onClick={this.props.delete.bind(null, number, incomes.id)}>-</button>
					</td>
					<td> <TextInput
						value={incomes.type}
						name={this.props.name}
						onChange={this.props.saveTodoState.bind(null, incomes.id, "type")}
						/>
						</td>
					<td>
						<TextInput
							value={incomes.amount}
							name={this.props.name}
							onChange={this.props.saveTodoState.bind(null, incomes.id, "amount")}
						/>
					</td>
				</tr>
			);
		}
		if (this.props.title == "Income"){
			var output = this.props.incomes.map(createTodoRow.bind(this, 0), this)
		} else {
			var output = this.props.expenses.map(createTodoRow.bind(this, 1), this)
		}
		return (
			<div>
				<h1>{this.props.title}</h1>
				<table>
					<thead>
						<tr>
							<th>Type of {this.props.title}</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{output}
					</tbody>
				</table>
			<button onClick={this.props.createNew.bind(null, this.props.title)}>+</button>
			<div>
				{this.props.total}
			</div>



			</div>
		)
	}
})

module.exports = FinancePlan;
