import React, { Component } from 'react';

class Input extends Component {
	state = {
		value: ''
	}

	render() {
		const { type, value, placeholder, onChange, onFocus, onBlur, valid } = this.props

		return (
			<div className='inputContainer'>
				<input
					className={valid === false ? 'invalid': 'valid'}
					type={type}
					value={value ? value : ''}
					placeholder={placeholder ? placeholder : ''}
					onChange={ (e) => onChange(e.target.value) }
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</div>
		)
	}
}

export default Input;