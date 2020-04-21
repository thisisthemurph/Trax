import React, { Component } from 'react';

import './GenderElement.scss'

class GenderElement extends Component {
	state = {
		elementHasFocus: false
	}

	getClassNames = sex => {
		const specific = sex === 'f' ? 'femaleSelector' : 'maleSelector'

		if (this.props.sex === sex) {
			return `selected selector ${specific}`
		}

		return `selector ${specific}`	
	}

	handleChange = event => {
		event.preventDefault()
		this.props.updateSelected(event.target.value)
	}

	render() {
		return (
			<div className={`GenderElement${this.state.elementHasFocus ? ' focused' : ''}`}>
				<div className={this.getClassNames('m')} onClick={() => this.props.updateSelected('m')}>
					<input
						type='radio'
						name='sex'
						value='m'
						checked={this.props.sex === 'm'}
						onChange={this.handleChange}
						onFocus={() => {
							this.setState({ elementHasFocus: true })
							this.props.updateSelected('m')
						}}
						onBlur={() => {this.setState({ elementHasFocus: false })}}
					/>
					<span className='emoji' role='img' aria-label='male'>🧔</span>
					<p className='text'>Man</p>
				</div>
				
				<div className={this.getClassNames('f')}
					onClick={() => this.props.updateSelected('f')}>
					<input 
						type='radio'
						name='sex' 
						value='f' 
						checked={this.props.sex === 'f'} 
						// readOnly={true}
						onChange={this.handleChange}
						onFocus={() => {
							this.setState({ elementHasFocus: true })
							this.props.updateSelected('f')
						}}
						onBlur={() => {this.setState({ elementHasFocus: false })}}
					/>
					<span className='emoji' role='img' aria-label='female'>👩‍🦰</span>
					<p className='text'>Woman</p>
				</div>
			</div>
		)
	}
}

export default GenderElement;