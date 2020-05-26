import React, { useState } from "react"

const Input = ({
	type,
	label,
	value,
	placeholder,
	onChange,
	hasError,
	errorMessage,
	autoFocus = false,
}) => {
	const id = label.replace(/\s/g, "-")
	const [showInfo, setShowInfo] = useState(false)

	const classes = ["InputContainer", hasError ? "invalid" : "valid"].join(" ")

	return (
		<div className={classes}>
			<div className="InputContainer__header">
				<label htmlFor={id} className={hasError ? "invalid" : "valid"}>
					{label}
				</label>
				<ErrorIcon hasError={hasError} onClick={() => setShowInfo(!showInfo)} />
			</div>
			<div
				className={`InputContainer__info${
					showInfo && hasError ? " InputContainer__info--show" : ""
				}`}
			>
				{errorMessage}
			</div>
			<div className="input-wrapper">
				<input
					id={id}
					type={type}
					value={value ? value : ""}
					placeholder={placeholder ? placeholder : ""}
					autoFocus={autoFocus}
					onChange={(e) => {
						onChange(e.target.value)
						console.log(hasError)
					}}
				/>
			</div>
		</div>
	)
}

const ErrorIcon = ({ hasError, onClick }) => {
	const classes = ["InputContainer__error", hasError ? "InputContainer__error--show" : null]
		.map((c) => c)
		.join(" ")

	return (
		<div className={classes} onClick={onClick}>
			<svg className="svg-icon" viewBox="0 0 20 20">
				<path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
			</svg>
		</div>
	)
}

export default Input
