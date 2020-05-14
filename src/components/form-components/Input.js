import React from "react"

const Input = ({ type, value, placeholder, onChange, hasError, errorMessage }) => {
	const getErrorAlert = () => {
		if (errorMessage) {
			return <div className="error">{errorMessage}</div>
		}

		return <div>{"\u00A0"}</div>
	}

	return (
		<div className="inputContainer">
			<input
				className={hasError ? "invalid" : "valid"}
				type={type}
				value={value ? value : ""}
				placeholder={placeholder ? placeholder : ""}
				onChange={(e) => onChange(e.target.value)}
			/>

			{getErrorAlert()}
		</div>
	)
}

export default Input
