import React, { useState, useEffect, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import { Input, Button, GenderElement } from "../form-components"

import { UserContext } from "../../context/UserContext"

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

	const [user] = useContext(UserContext)

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
				setButtonDisabled(() => true)
				return
			}

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

	if (user) {
		return <Redirect to="/profile" />
	}

	return (
		<form className="form container">
			<h2 className="form__heading">Sign up</h2>

			<Input
				type="text"
				label="Name"
				value={formData.name}
				autoFocus={true}
				hasError={formErrors.name.hasError}
				errorMessage={formErrors.name.msg}
				onChange={(value) => setInputValue("name", value)}
			/>

			<Input
				type="email"
				label="Email address"
				value={formData.email}
				hasError={formErrors.email.hasError}
				errorMessage={formErrors.email.msg}
				onChange={(value) => setInputValue("email", value)}
			/>

			<GenderElement
				sex={formData.sex ? formData.sex : "f"}
				updateSelected={(value) => setInputValue("sex", value)}
			/>

			<Input
				type="password"
				label="Password"
				value={formData.password}
				hasError={formErrors.password.hasError}
				errorMessage={formErrors.password.msg}
				onChange={(value) => setInputValue("password", value)}
			/>

			<Input
				type="password"
				label="Password again"
				value={formData.password2}
				hasError={formErrors.password2.hasError}
				errorMessage={formErrors.password2.msg}
				onChange={(value) => setInputValue("password2", value)}
			/>

			<Button
				submitButton={true}
				text="Sign up"
				disabled={buttonDisabled}
				onClick={() => this.doRegistration()}
			/>

			<Link to="/login">Log in instead...</Link>
		</form>
	)
}

export default RegistrationForm
