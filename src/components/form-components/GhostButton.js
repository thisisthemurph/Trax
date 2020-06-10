import React from "react"
import { Button } from "."
import "./Button.scss"

const GhostButton = ({
	text,
	children,
	onClick,
	disabled,
	active,
	formButton = false,
	color = null,
}) => {
	return (
		<Button
			text={text}
			children={children}
			onClick={onClick}
			disabled={disabled}
			active={active}
			varyant="button__ghost"
			color={color}
			formButton={formButton}
		/>
	)
}

export default GhostButton
