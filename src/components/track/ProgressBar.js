import React from "react"

import "./ProgressBar.scss"

const ProgressBar = ({ percentage }) => {
	const progress = Math.min(Math.floor(percentage), 100)

	return (
		<div className="ProgressBar">
			<div className="ProgressBar__progress" style={{ width: `${progress}%` }}>
				<span className="ProgressBar__value">{progress}%</span>
			</div>
		</div>
	)
}

export default ProgressBar
