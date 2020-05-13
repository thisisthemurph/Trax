import React from "react"

const Input = (props) => {
	const { type, value, placeholder, onChange, onFocus, onBlur, valid } = props

	return (
		<div className="inputContainer">
			<input
				className={valid === false ? "invalid" : "valid"}
				type={type}
				value={value ? value : ""}
				placeholder={placeholder ? placeholder : ""}
				onChange={(e) => onChange(e.target.value)}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
		</div>
	)
}

export default Input
