var React = require('react');
var Chart = require('chart.js')
var ItemStore = require('../stores/itemStore');
var browserHistory = require("react-router").browserHistory;
var Header = require('./common/header');



var Projections = React.createClass({
	getInitialState: function () {
		return {
			type: ItemStore.getAllExpenses(),
			word: "Expense",
			opposite: "Income",
			chart: "",
			alert: ""
		}
	},
	componentWillMount: function () {
		var months = "months"
		console.log("Hi" + String(ItemStore.getGoal() - ItemStore.getNet()) + " ")
		if (ItemStore.getMonths() == "1") {
			months = "month"
		}
		if (this.changeColor("") == "rgba(0, 204, 0, )") {
			this.setState({
				alert: "According to your life style you should hit your goal in " + ItemStore.getMonths() + " " +months + "."
			})
		} else {
			if (Math.ceil(ItemStore.getGoal() / ItemStore.getNet()) - ItemStore.getMonths() < 2) {
				months = "month"
			}
			this.setState({
				alert: "Sorry, according to your life-style you will either need to cut back $" + String((ItemStore.getGoal() - (ItemStore.getNet()* ItemStore.getMonths()))/ItemStore.getMonths()) + " a month or add at most "+ String(Math.ceil(ItemStore.getGoal() / ItemStore.getNet()) - ItemStore.getMonths()) + " " + months +"."
			})
		}
	},
	componentDidMount: function () {
	var ctx = document.getElementById("myBarGraph");
	Chart.defaults.global.defaultFontColor = "#333333";
	var myChart = new Chart(ctx, {
		circumference: Math.PI,
	    type: 'bar',
	    data: {
	        labels: ["Goal", "Net Income"],
	        datasets: [{
	            label: 'Projected',
	            data: [ItemStore.getGoal(), ItemStore.getNet() * ItemStore.getMonths()],
	            backgroundColor: [
	            	'rgba(54, 162, 235, 0.2)',
	                this.changeColor(0.2),

	            ],
	            borderColor: [
	            	'rgba(54, 162, 235, 1)',
	                this.changeColor(1),
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	    	scales: {
	    		yAxes: [{
	    			ticks: {
	    				beginAtZero: true
	    			}
	    		}]
	    	}
	    },
	    defaults: {
	    	global: {
	    		fontColor: "black"
	    	}
	    }
	});
	this.expenseData(this.state.type)
},
setGraph: function (data) {
	var ctx = document.getElementById("myPieChart")
	var myChart = new Chart(ctx, {
		circumference: Math.PI,
	    type: 'doughnut',
	    data: {
			    labels: data.labels,
			    datasets: [{
			            data: data.data,
			            backgroundColor: data.backgroundColor,
			            hoverBackgroundColor: [

			            ]
			        }]
			},
			options: {
				animation: {
					animateScale: true
				},
			}

	});
	this.setState({
		chart: myChart
	})
},

expenseData: function () {
	if (this.state.chart) {
		window.Mychart = this.state.chart;
		Mychart.destroy()
	}

	var expenses = this.state.type
	var colors = ["#41A725", "#A0CC6B", "#D1570D","#5A1F00","#FDE792","#FD4A92","#109C92","#FDAE31","#FD0000","#41A7CC","#FF91A5","#B047FF","#70D1C4"]
	var backgroundColor = []
	var data = []
	var labels = []
	for (var i = 0; i <= expenses.length-1; i++) {
		labels.push(expenses[i].type)
		data.push(expenses[i].amount)
		backgroundColor.push(colors[i])
	}
	if (this.state.word == "Expense") {
		this.setState({
			type: ItemStore.getAllIncomes(),
			word: "Incomes",
			opposite: "Expenses"
		})
	} else {
		this.setState({
			type: ItemStore.getAllExpenses(),
			word: "Expense",
			opposite: "Income"
		})
	}

	this.setGraph({
		data:data,
		labels:labels,
		backgroundColor:backgroundColor
	})
},

changeColor: function (opacity) {
		if (ItemStore.getNet() * ItemStore.getMonths() >= ItemStore.getGoal()) {
			return 'rgba(0, 204, 0, '+ opacity +')'
		} else {
			return 'rgba(255, 99, 132,'+ opacity +')'
		}
	},
	render: function () {
		return (
			<div>
				<Header />
				<div id="goalAlert">{this.state.alert}</div>
				<div className="titlebar">
					<div className="expenseDiv">{this.state.opposite}</div>
				</div>
				<div className="charts">
					<canvas id="myPieChart" width="100" height='100'></canvas>
					<canvas id="myBarGraph" width="100" height='100'></canvas>
				</div>
				<button className="expenseButton" onClick={this.expenseData}>{this.state.word}</button>
			</div>



		)
	}
})

module.exports = Projections;
