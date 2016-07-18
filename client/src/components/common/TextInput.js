'use strict';

var React = require('react');


var TextInput = React.createClass({
	render: function () {
		var wrapperClass = 'form-group';

		if (this.props.error && this.props.error.length > 0) {
			wrapperClass += ' ' + 'has-error';
		}

		return (
			<div className={wrapperClass}>
				
				<div className={this.props.className}>
					<input
						name={this.props.name}
						className="form-control"
						placeholder={this.props.placeholder}
						ref={this.props.name}
						value={this.props.value}
						onChange={this.props.onChange}
					/>
					<div>{this.props.error}</div>
				</div>
			</div>
		);
	}
});

module.exports = TextInput;