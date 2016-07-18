var React = require('react');
var Chart = require('chart.js')
var ItemStore = require('../stores/itemStore')


var Projections = React.createClass({
	componentDidMount: function () {
	var ctx = document.getElementById("myBarGraph")
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
	    }
	   
	});
	var ctx = document.getElementById("myPieChart")
	var PieData = this.expenseData()
	var myChart = new Chart(ctx, {
		circumference: Math.PI,
	    type: 'doughnut',
	    data: {
			    labels: PieData.labels,
			    datasets: [
			        {
			            data: PieData.data,
			            backgroundColor: PieData.backgroundColor,
			            hoverBackgroundColor: [
			              
			            ]
			        }]
			}
	});
},

expenseData: function () {
	var expenses = ItemStore.getAllExpenses()
	var colors = ["#7fffd4", "#f0ffff", "#f5f5dc","#ffe4c4","#000","#ffebcd","#00f","#8a2be2","#a52a2a","#deb887","#ea7e5d","#5f9ea0","#7fff00","#d2691e","#ff7f50","#6495ed","#fff8dc","#dc143c","#0ff","#00008b","#008b8b","#b8860b","#a9a9a9","#006400","#a9a9a9","#bdb76b","#8b008b","#556b2f",
"#eee8aa","#98fb98","#afeeee","#db7093","#ffefd5","#ffdab9","#cd853f","#ffc0cb","#dda0dd","#b0e0e6"]
	var backgroundColor = []
	var data = []
	var labels = []
	for (var i = 0; i <= expenses.length-1; i++) {
		labels.push(expenses[i].type)
		data.push(expenses[i].amount)
		backgroundColor.push(colors[i])
	}
	return {
		data:data,
		labels:labels,
		backgroundColor:backgroundColor
	}
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
				<div className="imgContainer"><img className="image" src="../images/moneylogo.png" alt="logo" /></div>
				 <div className="charts">
					<canvas id="myPieChart" width="100" height='100'></canvas>
					<canvas id="myBarGraph" width="100" height='100'></canvas>
				</div>
			</div>
			
					
			
		)
	}
})

module.exports = Projections;