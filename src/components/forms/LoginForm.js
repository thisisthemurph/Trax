import React, { useState, useEffect, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { Input, Button } from "../form-components"
import { UserContext } from "../../context/UserContext"
import { login } from "../../auth/Auth"

import "./Form.scss"

const LoginForm = (props) => {
	const [formData, setFormData] = useState({ email: null, password: null })
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [isNewUser, setIsNewUser] = useState(false)

	const [user, setUser] = useContext(UserContext)

	useEffect(() => {
		if (props.location.state && props.location.state.hasOwnProperty("newUser")) {
			setIsNewUser(() => props.location.state.newUser)
		}
	}, [user, props.history, props.location.state])

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

	const loginHandler = async () => {
		if (!formData.email) {
			return
		}

		if (!formData.password) {
			return
		}

		setButtonDisabled(true)

		const user = await login(formData.email, formData.password)

		if (user) {
			setUser(user)
			props.history.push("/profile")
		} else {
			props.history.push("/login")
		}
	}

	if (user) {
		return <Redirect to="/profile" />
	}

	return (
		<form className="form">
			<h2 className="form__heading">Log in</h2>

			{isNewUser && (
				<p className="alert">
					Your account has been sucesfully created, you can now log in.
				</p>
			)}

			<Input
				type="email"
				label="Email address"
				autoFocus={true}
				value={formData.email}
				onChange={(value) => setInputValue("email", value)}
			/>

			<Input
				type="password"
				label="Password"
				value={formData.password}
				onChange={(value) => setInputValue("password", value)}
			/>

			<Button text="Log in" disabled={buttonDisabled} onClick={loginHandler} />
			<Link to="/signup">Sign up...</Link>
		</form>
	)
}

export default LoginForm
