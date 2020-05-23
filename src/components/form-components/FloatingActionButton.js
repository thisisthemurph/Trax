import React from "react"
import "./Button.scss"

const FloatingActionButton = ({ children, onClick }) => {
	return (
		<button className="Button Button__circle Button__floatingaction" onClick={onClick}>
			<span className="content">{children}</span>
		</button>
	)
}

export default FloatingActionButton
