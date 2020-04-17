import React, { Component } from 'react';

class Button extends Component {

	render() {

		const { text, onClick, disabled } = this.props

		return (
			<button
				className='Button'
				onClick={onClick}
				disabled={disabled ? disabled : false}
			>
				{text}
			</button>
		)
	}
}

export default Button;
