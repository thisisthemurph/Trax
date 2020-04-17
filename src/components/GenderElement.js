import React, { Component } from 'react';

import './GenderElement.scss'

class GenderElement extends Component {

	// updateSelected = sex => {
	// 	this.setState({ sex })
	// }

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
					<span class='emoji' role='img' aria-label='male'>🧔</span>
					<p className='text'>Male</p>
				</div>
				
				<div
					className={this.getClassNames('f')}
					onClick={() => this.props.updateSelected('f')}
				>
					<span class='emoji' role='img' aria-label='female'>👩‍🦰</span>
					<p className='text'>Female</p>
				</div>
			</div>
		)
	}
}

export default GenderElement;