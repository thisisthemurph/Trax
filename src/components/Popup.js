import React from "react"
import "./Popup.scss"

const Popup = ({ heading, children, show, onClose }) => {
	return (
		<div className={`overlay${show ? " show" : ""}`}>
			<div className="Popup">
				<div className="Popup__top">
					<h1 className="Popup__heading">{heading}</h1>
					<button className="Popup__close-btn" onClick={() => onClose()}>
						{String.fromCharCode(215)}
					</button>
				</div>
				<div className="Popup__content">{children}</div>
			</div>
		</div>
	)
}

export default Popup
