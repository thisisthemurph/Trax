import React from "react"
import "./Button.scss"

const FloatingActionButton = ({ children, onClick, hidden = false }) => {
	const classes = [
		"button",
		"button__circle",
		"button__floatingaction",
		hidden ? "button__floatingaction--hidden" : null,
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
