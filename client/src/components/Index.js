var React = require('react');
var TextInput = require('./common/TextInput')
var Link = require('react-router').Link;
var browserHistory = require("react-router").browserHistory

var Index = React.createClass({
	getInitialState: function () {
		return {
			errors: {},
			text: {
				email: '',
				password: ''
			}
		}
	},
	saveTodoState: function (event) {
		var field = event.target.name;
		var value = event.target.value;
		var newText = Object.assign({}, this.state.text);

		newText[field] = value;

		this.setState({
			text: newText
		})
	},
	link: function () {
		browserHistory.push("/signup")
	},
	showEnd: function () {
		browserHistory.push("/FinancePlan");
	},
	render: function () {
		return (
			<div>

				<div className="imgContainer"><img className="image" src="../images/moneylogo.png" alt="logo" /></div>
					<div className="inputContainer">
						<TextInput 
							className="signInInput"
							name="email"
							placeholder="EMAIL"
							value={this.state.text.email}
							onChange={this.saveTodoState}
							error={this.state.errors.email}
						/>
						<TextInput 
							className="signInInput"
							name="password"
							placeholder="Password"
							value={this.state.text.password}
							onChange={this.saveTodoState}
							error={this.state.errors.password}
						/>
						<div className="divButton"><button className="btn btn-success" onClick={this.showEnd} >Sign In</button></div>
						{/*<button onClick={this.showEnd} >Sign In</button>*/}
						<hr />
						<div className="divButton"><button className="btn btn-success" onClick={this.link} >Sign Up</button></div>
					</div>
						
			</div>
		)
	}
})

module.exports = Index;