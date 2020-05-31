import React, { useState } from "react"

const InputContainer = ({
	label,
	id = null,
	hasError = false,
	errorMessage = null,
	infoMessage = null,
	children,
}) => {
	const [showError, setShowError] = useState(false)
	const [showInfo, setShowInfo] = useState(false)

	let _id = id
	if (!_id) {
		_id = label.replace(/\s/g, "_").toLowerCase()
	}

	const classes = ["InputContainer", hasError ? "invalid" : "valid"].join(" ")

	return (
		<div className={classes}>
			<div className="InputContainer__header">
				<label htmlFor={_id} className={hasError ? "invalid" : "valid"}>
					{label}
				</label>
				<ErrorIcon hasError={hasError} onClick={() => setShowError(!showError)} />
				{infoMessage && <InfoIcon onClick={() => setShowInfo(!showInfo)} />}
			</div>

			{hasError ? (
				<ErrorMessage show={showError} msg={errorMessage} />
			) : infoMessage ? (
				<InfoMessage show={showInfo} msg={infoMessage} />
			) : null}

			<div className="input-wrapper">{children}</div>
		</div>
	)
}

const InfoMessage = ({ show, msg }) => {
	return (
		<div className={`InputContainer__info${show && msg ? " InputContainer__info--show" : ""}`}>
			<p>{msg}</p>
		</div>
	)
}

const ErrorMessage = ({ show, msg }) => {
	return (
		<div
			className={`InputContainer__error${show && msg ? " InputContainer__error--show" : ""}`}
		>
			<p>{msg}</p>
		</div>
	)
}

const ErrorIcon = ({ hasError, onClick }) => {
	const classes = ["svg-icon", "svg-icon__error", hasError ? "svg-icon__error--show" : null]
		.map((c) => c)
		.join(" ")

	return (
		<div className={classes} onClick={onClick}>
			<svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" viewBox="0 0 20 20">
				<path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
			</svg>
		</div>
	)
}

const InfoIcon = ({ onClick }) => {
	return (
		<div className=".svg-icon .svg-icon__info" onClick={onClick}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="svg-icon svg-icon__info"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="12" cy="12" r="10"></circle>
				<line x1="12" y1="16" x2="12" y2="12"></line>
				<line x1="12" y1="8" x2="12.01" y2="8"></line>
			</svg>
		</div>
	)
}

export default InputContainer
