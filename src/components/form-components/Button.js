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

	return (
		<button className={classes} onClick={onClick} disabled={disabled ? disabled : false}>
			<span className="content">{text ? text : children}</span>
		</button>
	)
}

export default Button
