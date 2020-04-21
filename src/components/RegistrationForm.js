import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import Button from './Button'
import GenderElement from './GenderElement'

class RegistrationForm extends Component {
	state = {
		error: null,

		buttonDisabled: false,
		formHasErrors: false,
		formErrors: {
			name: '',
			email: '',
			password: '',
			password2: ''
		},

		name: {
			value: '',
			valid: false,
			focused: false
		},
		email: {
			value: '',
			valid: true,
			focused: false
		},
		sex: {
			value: 'f'
		},
		password: {
			value: '',
			valid: true,
			focused: false
		},
		password2: {
			value: '',
			valid: true,
			focused: false
		}
	}

	setInputValue = (property, value) => {
		this.setState({
			[property]: {
				...this.state[property],
				value: value
			}
		})
	}

	cleanInputValue = (property) => {
		this.setState({
			[property]: this.state[property].trim()
		})
	}

	validateField = (fieldName) => {
		const value = this.state[fieldName].value

		let nameValid = this.state.name.valid
		let emailValid = this.state.email.valid
		let passwordValid = this.state.password.valid
		let password2Valid = this.state.password2.valid
		let formErrors = this.state.formErrors

		switch(fieldName) {
			case 'name':
				nameValid = value.length >= 1
				formErrors.name = nameValid ? '' : 'You forgot to tell us what to call you'
				break

			case 'email':
				emailValid = Boolean(value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
				formErrors.email = emailValid ? '' : 'There seems to be an issue with your email address'
				break
			
			case 'password':
				passwordValid = value.length >= 6
				formErrors.password = passwordValid ? '' : 'The password must be at least 6 characters long'
				break
			
			case 'password2':
				password2Valid = value === this.state.password.value
				formErrors.password2 = password2Valid ? '' : 'Those passwords don\'t look the same 👀'
				break			

			default:
				break;
		}

		this.setState({
			formErrors,
			name: { ...this.state.name, valid: nameValid },
			email: { ...this.state.email, valid: emailValid },
			password: { ...this.state.password, valid: passwordValid },
			password2: { ...this.state.password2, valid: password2Valid }
		}, this.validateForm)
	}

	validateForm = () => {
		const { name, email, password, password2 } = this.state

		const allElementsFocused = name.focused && email.focused && password.focused && password2.focused
		
		let formIsValid = false
		if (allElementsFocused) {
			formIsValid = name.valid && email.valid && password.valid && password2.valid
		} else {
			formIsValid = false;
		}

		this.setState({ 
			formHasErrors: !formIsValid
		})

		console.log({
			formHasErrors: this.state.formHasErrors,
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		})
	}

	resetForm = () => {
		this.setState({
			error: null,
	
			buttonDisabled: false,
			formHasErrors: false,
			formErrors: {
				name: '',
				email: '',
				password: '',
				password2: ''
			},

			password: {
				value: '',
				valid: true,
				focused: false
			},
			password2: {
				value: '',
				valid: true,
				focused: false
			}
		})
	}

	doRegistration = async () => {
		const {name, email, sex, password, password2} = this.state
		if (!name.value || !email.value || !password.value || !password2.value) {
			alert('Please fill out the entrire form')
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
			return <p className='alert error'>{this.state.error}</p>
		}

		const allErrors = Object.values(this.state.formErrors).filter(errorMsg => errorMsg.length > 0)

		if (allErrors.length > 0) {
			return (
				<div className='alert error'>
					{allErrors.map((errorMsg, idx) => {
						return <p key={idx}>{ errorMsg }</p>
					})}
				</div>
			)
		}

		return null
	}

	isValid = property => {
		const elem = this.state[property]

		if (elem.valid)
			return true
		else
			if (elem.focused)
				return false
			else
				return true
	}

	setFocused = property => {
		this.setState({
			[property]: {
				...this.state[property],
				focused: true
			}
		})
	}

	render() {
		return (
			<form className="RegistrationForm">
				<p className='heading'>Sign up</p>

				{this.getErrorMessage()}

				<Input
					type='text'
					placeholder='What is your name?'
					value={this.state.name.value}
					valid={this.isValid('name')}
					onChange={ (value) => { this.setInputValue('name', value) } }
					onFocus={ () => { this.setFocused('name') }}
					onBlur={ () => { this.validateField('name') } }
				/>

				<Input
					type='email'
					placeholder='your@email.com'
					value={this.state.email.value}
					valid={this.isValid('email')}
					onChange={ (value) => this.setInputValue('email', value)}
					onFocus={ () => { this.setFocused('email') }}
					onBlur={ () => { this.validateField('email') } }
				/>

				<GenderElement
					sex={this.state.sex.value}
					updateSelected={(sex) => {
						this.setState({ 'sex': {value: sex} })
					}}
				/>

				<Input
					type='password'
					placeholder='Password'
					value={this.state.password.value}
					valid={this.isValid('password')}
					onChange={ (value) => this.setInputValue('password', value)}
					onFocus={ () => { this.setFocused('password') }}
					onBlur={ () => { this.validateField('password') } }
				/>

				<Input
					type='password'
					placeholder='Password again please'
					value={this.state.password2.value}
					valid={this.isValid('password2')}
					onChange={ (value) => this.setInputValue('password2', value)}
					onFocus={ () => { this.setFocused('password2') }}
					onBlur={ () => { this.validateField('password2') } }
				/>

				<Button
					text='Sign up'
					disabled={this.buttonDisabled}
					onClick={ () => this.doRegistration() }
				/>

				<Link to="/login">Log in instead</Link>
			</form>
		)
	}
}

export default RegistrationForm;
