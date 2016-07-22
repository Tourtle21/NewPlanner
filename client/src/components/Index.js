var React = require('react');
var TextInput = require('./common/TextInput')
var Link = require('react-router').Link;
var browserHistory = require("react-router").browserHistory;
var UserActionCreator = require("../actions/UserActionCreator")
var UserStore = require("../stores/userStore")

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
	setError: function (emailerror, password) {
		if (!password) {
			password = "This field should not be blank"
		}
		this.setState({
			errors: {
				email: emailerror,
				password: password
			}
		})
	},
	componentWillMount: function () {
		UserStore.addChangeListener(this.onChange);
	},

	componentWillUnmount: function () {
		UserStore.removeChangeListener(this.onChange);
	},

	onChange: function () {
		console.log(UserStore.getError())
		if (UserStore.getError() == "wrong") {
			this.setState({
				errors: {
					email: "username or password is incorrect",
					password: "username or password is incorrect"
				}
			})
		} else {
			browserHistory.push("/FinancePlan");
		}
	},
	showEnd: function () {
		if (this.state.text.email == "" && this.state.text.password == "") {
			this.setError("This field should not be blank", false)
		} else if (this.state.text.email == "") {
			this.setError("This field should not be blank", true)
		} else if (this.state.text.password == "") {
			this.setError("", false)
		}
		else {
			UserActionCreator.removeError()
			UserActionCreator.getUser(this.state.text.email, this.state.text.password)
		}
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
						type = "password"
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
