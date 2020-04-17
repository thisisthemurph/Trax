import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import GenderElement from './GenderElement'

class RegistrationForm extends Component {
	state = {
		name: '',
		email: '',
		sex: 'f',
		password: '',
		password2: '',
		buttonDisabled: false,
		error: null
	}

	setInputValue = (property, value) => {
		this.setState({
			[property]: value.trim()
		})
	}

	resetForm = () => {
		this.setState({
			name: '',
			email: '',
			sex: 'f',
			password: '',
			password2: '',
			buttonDisabled: false,
			error: null
		})
	}

	doRegistration = async () => {
		const {name, email, sex, password, password2} = this.state
		if (!name || !email || !password || !password2) {
			console.log('One of the required input elements was blank')
			return
		}

		this.setState({ buttonDisabled: true })

		try {
			const res = await fetch('http://localhost:5000/trax/api/auth/register', {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email, sex, password, password2 })
			})

			const result = await res.json()

			if (result && result.success) {
				this.props.history.push({
					pathname: '/login',
					state: {
						newUser: true
					}
				})
			} else {
				// The user is not logged in
				console.log(result.msg)
				this.resetForm()
				this.setState({ error: result.msg })
			}
		} 
		catch(e) {
			this.resetForm()
		}
	}

	getErrorMessage = () => {
		if (this.state.error) {
			return <p className='error'>{this.state.error}</p>
		}

		return null
	}

	render() {
		return (
			<form className="RegistrationForm">
				<p className='heading'>Sign up</p>

				{this.getErrorMessage()}

				<Input
					type='text'
					placeholder='Name'
					value={this.state.name}
					onChange={ (value) => this.setInputValue('name', value)}
				/>

				<Input
					type='email'
					placeholder='your@email.com'
					value={this.state.email}
					onChange={ (value) => this.setInputValue('email', value)}
				/>

				<GenderElement
					sex={this.state.sex}
					updateSelected={(sex) => {
						this.setState({ sex })
					}}
				/>

				<Input
					type='password'
					placeholder='Password'
					value={this.state.password}
					onChange={ (value) => this.setInputValue('password', value)}
				/>

				<Input
					type='password'
					placeholder='Password again please'
					value={this.state.password2}
					onChange={ (value) => this.setInputValue('password2', value)}
				/>

				<Button
					text='Sign up'
					disabled={this.state.buttonDisabled}
					onClick={ () => this.doRegistration() }
				/>

				<Link to="/login">Log in instead</Link>
			</form>
		)
	}
}

export default RegistrationForm;
