import React from "react"
import "./Button.scss"

const FloatingActionButton = ({ children, onClick, hidden = false }) => {
	const classes = [
		"Button",
		"Button__circle",
		"Button__floatingaction",
		hidden ? "Button__floatingaction--hidden" : null,
	]
		.map((c) => c)
		.join(" ")

	return (
		<button className={classes} onClick={onClick}>
			<span className="content">{children}</span>
		</button>
	)
}

export default FloatingActionButton
