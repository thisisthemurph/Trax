import React, { useState } from "react"
import { ArrowUpIcon } from "../icons"

import "./Popup.scss"

const Popup = ({ heading, children, show, onClose }) => {
	const [animateHide, setAnimateHide] = useState(false) // Don't animate the hide on the first instance

	const overlayClasses = [
		"overlay",
		show ? "overlay--show" : null,
		animateHide ? (show ? null : "overlay--hide") : null,
	]
		.filter((c) => c)
		.join(" ")

	const pupupClasses = ["popup", show ? "popup--show" : "popup--hide"].filter((c) => c).join(" ")

	const onCloseHandler = () => {
		setAnimateHide(() => true)
		onClose()
	}

	return (
		<div className={overlayClasses}>
			<div className={pupupClasses}>
				<div className="popup__header">
					<h1 className="popup__title">{heading}</h1>
				</div>
				<div className="popup__content">{children}</div>
				<footer className="popup__footer">
					<button className="popup__close-button" onClick={onCloseHandler}>
						<ArrowUpIcon />
					</button>
				</footer>
			</div>
		</div>
	)
}

export default Popup
