import React, { useState } from "react"
import "./Popup.scss"

const Popup = ({ heading, children, show, onClose }) => {
	const [animateHide, setAnimateHide] = useState(false) // Don't animate the hide on the first instance

	const classes = ["overlay", show ? "show" : null, animateHide ? (show ? null : "hide") : null]
		.filter((c) => c)
		.join(" ")

	const onCloseHandler = () => {
		setAnimateHide(() => true)
		onClose()
	}

	return (
		<div className={classes}>
			<div className="Popup">
				<div className="Popup__top">
					<h1 className="Popup__heading">{heading}</h1>
				</div>
				<div className="Popup__content">{children}</div>
				<footer className="Popup__footer">
					<button className="Popup__close-button" onClick={onCloseHandler}>
						<ArrowUpIcon />
					</button>
				</footer>
			</div>
		</div>
	)
}

const ArrowUpIcon = () => {
	return (
		<svg
			className="Popup__close-button--icon"
			version="1.1"
			id="Layer_1"
			x="0px"
			y="0px"
			viewBox="0 0 58.5 37.3"
			enableBackground="new 0 0 58.5 37.3"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M54.7,26.3L32.5,4.2c-2-1.9-5-1.9-6.9,0L3.4,26.3
	c-2,2-2.4,4.8-0.4,6.7l0.8,0.9c1.7,1.6,3.9,1.9,5.4,0.2c5.5-5.5,11-10.8,16.5-16.3c1.8-2,4.9-2,6.9,0c5.5,5.5,10.9,10.8,16.3,16.3
	c1.7,1.7,3.7,1.4,5.5-0.2l0.7-0.9C57.1,31.1,56.7,28.3,54.7,26.3L54.7,26.3z"
			/>
		</svg>
	)
}

export default Popup
