import React from "react"
import InputContainer from "./InputContainer"

const Input = ({
	type = "text",
	label,
	value,
	onChange,
	placeholder = null,
	hasError = false,
	infoMessage = null,
	errorMessage = null,
	autoFocus = false,
}) => {
	const id = label.replace(/\s/g, "_").toLowerCase()

	return (
		<InputContainer
			id={id}
			label={label}
			hasError={hasError}
			errorMessage={errorMessage}
			infoMessage={infoMessage}
		>
			<input
				type={type}
				id={id}
				value={value ? value : ""}
				placeholder={placeholder ? placeholder : null}
				autoFocus={autoFocus}
				onChange={(e) => {
					onChange(e.target.value)
				}}
			/>
		</InputContainer>
	)
}

export default Input
