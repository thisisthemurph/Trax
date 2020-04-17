import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Input from './Input'
import Button from './Button';

import auth from '../auth/auth'

class LoginForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			buttonDisabled: false,
			newUser: false
		}
	}

	async componentDidMount() {
		const tokenIsAuthentic = await auth.authenticateCurrentToken()
		console.log(`@LoginForm -> Authentic token? ${tokenIsAuthentic}`)

		const hasState = typeof this.props.location.state !== 'undefined'
		console.log({hasState})
		console.log(this.props.location)
		if (hasState && this.props.location.state.hasOwnProperty('newUser')) {
			this.setState({	newUser: this.props.location.state.newUser })
		}

		if (auth.isAuthenticated()) {
			this.props.history.push('/profile')
		}
	}

	setInputValue = (property, value) => {
		this.setState({
			[property]: value.trim()
		})
	}

	resetForm = () => {
		this.setState({
			email: '',
			password: '',
			buttonDisabled: false,
			newUser: false
		})
	}

	doLogin = async () => {

		console.log('Login clicked')
		console.log(auth.authenticated)

		if (!this.state.email) {
			return
		}

		if (!this.state.password) {
			return
		}

		this.setState({ buttonDisabled: true })

		const success = await auth.login(this.state.email, this.state.password)
		this.props.setLoggedIn(success)

		console.log('Logging in...')
		console.log(auth.authenticated)

		if (success) {
			this.props.history.push('/profile')
		} else {
			// There has been an issue logging in
			this.resetForm()
			this.props.history.push('/login')
		}

		
	}

	getAlertMessage = () => {
		if (this.state.newUser) {
			return <p className='alert'>Your account has been sucesfully created, you can now log in.</p>
		} else {
			return null
		}
	}

	render() {
		return (
			<div className="LoginForm">
				<h1>Log in</h1>

				{this.getAlertMessage()}

				<Input
					type='email'
					placeholder='your@email.com'
					value={this.state.email}
					onChange={ (val) => this.setInputValue('email', val) }
				/>

				<Input
					type='password'
					value={this.state.password}
					placeholder='Password'
					onChange={ (val) => this.setInputValue('password', val) }
				/>

				<Button
					text='Log in'
					disabled={this.state.buttonDisabled}
					onClick={ () => this.doLogin() }
				/>

				<Link to='/signup'>Sign up...</Link>
			</div>
		)
	}
}

export default LoginForm;
