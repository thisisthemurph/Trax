import React from "react"
import "./Button.scss"

const Button = ({ text, children, onClick, disabled, active, circle = false }) => {
	const classes = [
		"Button",
		circle ? "Button__circle" : null,
		disabled ? "disabled" : null,
		active ? "active" : null,
	]
		.filter((c) => c)
		.join(" ")

	console.log(text)
	console.log(children)

	return (
		<button className={classes} onClick={onClick} disabled={disabled ? disabled : false}>
			<span className="content">{text ? text : children}</span>
		</button>
	)
}

export default Button
