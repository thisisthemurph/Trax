import React from "react"
import { Button } from "."
import "./Button.scss"

const GhostButton = ({ text, children, onClick, disabled, active }) => {
	return (
		<Button
			text={text}
			children={children}
			onClick={onClick}
			disabled={disabled}
			active={active}
			varyant="button__warning"
		/>
	)
}

export default GhostButton
