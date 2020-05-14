import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input, Button } from "../form-components"

import auth from "../../auth/auth"

import "./Form.scss"

const LoginForm = (props) => {
	const [formData, setFormData] = useState({ email: null, password: null })
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [isNewUser, setIsNewUser] = useState(false)

	useEffect(() => {
		console.log(props.location)
		if (props.location.state && props.location.state.hasOwnProperty("newUser")) {
			setIsNewUser(() => props.location.state.newUser)
		}

		const checkUserIsAuthenticated = async () => {
			if (await auth.authenticateCurrentToken()) {
				props.history.push("/profile")
			}
		}

		checkUserIsAuthenticated()
	}, [])

	useEffect(() => {
		const toggleFormSubmitButton = () => {
			if ([formData.email, formData.password].includes(null)) {
				setButtonDisabled(() => true)
				return
			}

			setButtonDisabled(() => false)
		}

		toggleFormSubmitButton()
	}, [formData.email, formData.password])

	const setInputValue = (property, value) => {
		setFormData({
			...formData,
			[property]: value ? value : null,
		})
	}

	const doLogin = async () => {
		if (!formData.email) {
			return
		}

		if (!formData.password) {
			return
		}

		setButtonDisabled(true)

		const success = await auth.login(formData.email, formData.password)
		props.setLoggedIn(success)

		if (success) {
			props.history.push("/profile")
		} else {
			props.history.push("/login")
		}
	}

	return (
		<form className="LoginForm">
			<h3 className="heading">Log in</h3>

			{isNewUser && (
				<p className="alert">
					Your account has been sucesfully created, you can now log in.
				</p>
			)}

			<Input
				type="email"
				placeholder="your@email.com"
				value={formData.email}
				onChange={(value) => setInputValue("email", value)}
			/>

			<Input
				type="password"
				value={formData.password}
				placeholder="Password"
				onChange={(value) => setInputValue("password", value)}
			/>

			<Button text="Log in" disabled={buttonDisabled} onClick={doLogin} />
			<Link to="/signup">Sign up...</Link>
		</form>
	)
}

export default LoginForm
