import React, { Component } from 'react';

class Input extends Component {
	state = {
		value: ''
	}

	render() {

		const { type, value, placeholder, onChange } = this.props

		return (
			<div className='inputContainer'>
				<input
					type={type}
					value={value ? value : ''}
					placeholder={placeholder ? placeholder : ''}
					onChange={ (e) => onChange(e.target.value) }
				/>
			</div>
		)
	}
}

export default Input;