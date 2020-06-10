import React from "react"
import "./Button.scss"

const Button = ({
	text,
	children,
	onClick,
	disabled,
	active,
	varyant = null,
	color = null,
	circle = false,
	formButton = false,
	submitButton = false,
}) => {
	const classes = [
		"button",
		circle ? "button__circle" : null,
		disabled ? "disabled" : null,
		active ? "button--active" : null,
		varyant,
	]
		.filter((c) => c)
		.join(" ")

	if (submitButton || formButton) {
		return (
			<input
				className={classes}
				type={submitButton ? "submit" : "button"}
				value={text}
				onClick={onClick}
				disabled={disabled ? disabled : false}
			/>
		)
	}

	return (
		<button className={classes} onClick={onClick} disabled={disabled ? disabled : false}>
			<span className="content">{text ? text : children}</span>
		</button>
	)
}

export default Button
