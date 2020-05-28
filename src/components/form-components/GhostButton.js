import React from "react"
import { Button } from "."
import "./Button.scss"

const GhostButton = ({ text, children, onClick, disabled, active, color = null }) => {
	return (
		<Button
			text={text}
			children={children}
			onClick={onClick}
			disabled={disabled}
			active={active}
			varyant="Button__ghost"
			color={color}
		/>
	)
}

export default GhostButton
