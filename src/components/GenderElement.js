import React, { Component } from 'react';

import './GenderElement.scss'

class GenderElement extends Component {

	getClassNames = sex => {
		const specific = sex === 'f' ? 'femaleSelector' : 'maleSelector'

		if (this.props.sex === sex) {
			return `selected selector ${specific}`
		}

		return `selector ${specific}`	
	}

	render() {
		return (
			<div className='GenderElement'>
				<div
					className={this.getClassNames('m')}
					onClick={() => this.props.updateSelected('m')}
				>
					<input type='radio' name='sex' value='m' checked={this.props.sex === 'm'} readOnly={true} />
					<span className='emoji' role='img' aria-label='male'>🧔</span>
					<p className='text'>Male</p>
				</div>
				
				<div
					className={this.getClassNames('f')}
					onClick={() => this.props.updateSelected('f')}
				>
					<input type='radio' name='sex' value='f' checked={this.props.sex === 'f'} readOnly={true} />
					<span className='emoji' role='img' aria-label='female'>👩‍🦰</span>
					<p className='text'>Female</p>
				</div>
			</div>
		)
	}
}

export default GenderElement;