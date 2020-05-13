import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Input from "./Input"
import Button from "./Button"
import GenderElement from "./GenderElement"

const initailFormDataState = {
	name: null,
	email: null,
	sex: null,
	password: null,
	password2: null,
}

const initailFormErrorState = {
	name: { hasError: false, msg: null },
	email: { hasError: false, msg: null },
	sex: { hasError: false, msg: null },
	password: { hasError: false, msg: null },
	password2: { hasError: false, msg: null },
}

const RegistrationForm = () => {
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [formData, setFormData] = useState(initailFormDataState)
	const [formErrors, setFormErrors] = useState(initailFormErrorState)

	useEffect(() => {
		const setError = (property, value, msg = null) => {
			setFormErrors((prevState) => ({
				...prevState,
				[property]: { hasError: value, msg },
			}))
		}

		const toggleFormSubmitButton = () => {
			const values = [formData.name, formData.email, formData.password, formData.password2]

			if (values.includes(null)) {
				console.log("disabled")
				setButtonDisabled(() => true)
				return
			}

			console.log("ENABLED")
			setButtonDisabled(() => false)
		}

		if (formData.name && formData.name.length < 2) {
			setError("name", true, "Your name must be more than a single character")
		} else if (formData.name && formData.name.length > 25) {
			setError("name", true, "Your name must be 25 characters or less")
		} else {
			setError("name", false)
		}

		if (
			formData.email &&
			!Boolean(formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
		) {
			setError("email", true, "This doesn't look like a real email address")
		} else {
			setError("email", false)
		}

		if (formData.password && formData.password.length < 8) {
			setError("password", true, "Your password must be at least 8 characters in length")
		} else {
			setError("password", false)
		}

		if (formData.password2 && formData.password2 !== formData.password) {
			setError("password2", true, "The passwords you have provided do not match")
		} else {
			setError("password2", false)
		}

		toggleFormSubmitButton()
	}, [formData.name, formData.email, formData.password, formData.password2])

	const setInputValue = (property, value) => {
		setFormData({
			...formData,
			[property]: value ? value : null,
		})
	}

	return (
		<form className="RegistrationForm">
			<h3 className="heading">Sign up</h3>

			<Input
				type="text"
				placeholder="What is your name?"
				value={formData.name}
				hasError={formErrors.name.hasError}
				onChange={(value) => setInputValue("name", value)}
			/>

			<Input
				type="email"
				placeholder="your@email.com"
				value={formData.email}
				hasError={formErrors.email.hasError}
				onChange={(value) => setInputValue("email", value)}
			/>

			<GenderElement
				sex={formData.sex ? formData.sex : "f"}
				updateSelected={(value) => setInputValue("sex", value)}
			/>

			<Input
				type="password"
				placeholder="Password"
				value={formData.password}
				hasError={formErrors.password.hasError}
				onChange={(value) => setInputValue("password", value)}
			/>

			<Input
				type="password"
				placeholder="Password again please"
				value={formData.password2}
				hasError={formErrors.password2.hasError}
				onChange={(value) => setInputValue("password2", value)}
			/>

			<Button
				text="Sign up"
				disabled={buttonDisabled}
				// onClick={() => this.doRegistration()}
			/>

			<Link to="/login">Log in instead</Link>
		</form>
	)
}

export default RegistrationForm
