var React = require('react');
var Link = require('react-router').Link;
var browserHistory = require("react-router").browserHistory
var FinanceManager = require('./common/FinanceManager')
var ItemStore = require('../stores/itemStore')
var ItemActionCreator = require('../actions/ItemActionCreator')
var UserActionCreator = require('../actions/UserActionCreator')
var DropBox = require("./common/DropBox")
var TextInput = require("./common/TextInput")
var API = require("../helpers/api")
var UserStore = require("../stores/userStore");
var times = 0;
var Header = require("./common/header");

var FinancePlan = React.createClass({

	getInitialState: function () {
		return{
			incomes: [],
			expenses: [],
			totals: {
				total: 0,
				diff: 0,
				netIncome: 0,
			},
		}
	},
	componentWillUnmount: function () {
		ItemStore.removeChangeListener(this.onChange);
	},

	onChange: function () {
		this.update()
	},
	saveTodoState: function (id,type, event) {
		var field = event.target.name;
		var value = event.target.value;
		var type = type;
		if (type == "amount") {
			if (isNaN(value)) {
				return
			}
		}
		if (field == "incomes") {
			var newText = this.state.incomes;
			newText[id][type] = value;
			ItemActionCreator.updateItem(newText[id], "income")
			this.update()
		} else {
			var newText = this.state.expenses;
			newText[id][type] = value;
			ItemActionCreator.updateItem(newText[id], "expense")
			this.update()
		}




	},
	update: function () {
		this.setState({
			incomes: ItemStore.getAllIncomes(),
			expenses: ItemStore.getAllExpenses(),
		})
		var sum = 0;
		var expense = 0;
		for (var i = 0; i <= this.state.incomes.length -1; i++) {
			sum += Number(this.state.incomes[i].amount)
		}
		for (var i = 0; i <= this.state.expenses.length -1; i++) {
			expense += Number(this.state.expenses[i].amount)
		}
		this.setState({
				totals: {
					total:	sum,
					diff: expense,
					netIncome: sum - expense,
			}
		})
	},
	delete: function (number, id) {
		ItemActionCreator.deleteItem(number, id)
		this.update()
	},
	componentWillMount: function () {
		ItemStore.addChangeListener(this.onChange);
		var item = [ItemStore.getAllIncomes(), ItemStore.getAllExpenses()]
		if (UserStore.getifnew()) {
			ItemActionCreator.createItem(item);
		}
	},
	componentDidMount: function () {
		ItemActionCreator.initialize(UserStore.getId());
	},

	createNew: function (turn) {
		var number = 0;
		if (turn == "Monthly Expenses") {
			number = 1;
		}
		ItemActionCreator.createItem(number)
		this.update();
	},
	link: function () {
		ItemActionCreator.setGoal(document.getElementsByName("goal")[0].value, document.getElementsByTagName("select")[0].value, this.state.totals.netIncome)
		var item = ItemStore.getFullItem();
		ItemActionCreator.updateItem(item);
		UserActionCreator.setifnew(false)
		browserHistory.push("/projections")
	},
	render: function () {
		var total = this.state.totals.total
		var difference = this.state.totals.diff
		return (
			<div>
				<Header />
				<div className="imgContainer"><img className="image" src="../images/instructions.png" alt="logo" /></div>
				<div id="goal">
					<div id="goal-content">
						How much would you like to save in:
					</div>

					<DropBox />
					<TextInput
						name="goal"
						placeholder='goal amount'
						value={this.state.text}
						onChange={this.state.saveTodoState}
					/>
				</div>
				<div className="financeBackground">
					<div id="income">
						<FinanceManager
							name= "incomes"
							title= "Monthly Income"
							incomes= {this.state.incomes}
							total= {total}
							saveTodoState = {this.saveTodoState}
							createNew = {this.createNew}
							delete = {this.delete}
						/>
					</div>
					<div id="expense">
						<FinanceManager
							name= "expenses"
							title= "Monthly Expenses"
							expenses= {this.state.expenses}
							total= {difference}
							saveTodoState = {this.saveTodoState}
							createNew = {this.createNew}
							delete = {this.delete}
						/>
					</div>
				</div>
				<div className="clearall"></div>
				<div id="x007"> Monthly Cash Flo is:</div>
				<div id="total"> {this.state.totals.netIncome.toFixed(2)} </div>
				<div id="centerbutton">
					<button id="calculate" onClick={this.link}>Calculate</button>
				</div>
			</div>
		)
	}
})

module.exports = FinancePlan;
