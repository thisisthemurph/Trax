import React from "react"

import "./ProgressBar.scss"

const ProgressBar = ({ percentage, target }) => {
	const progress = Math.min(Math.floor(percentage), 100)
	const css = { width: `${progress < 0 ? 0 : progress}%` }

	const messages = {
		basic: [
			`You have some work to do, but we know you can avhieve your ${target} target.`,
			`There is a ways to go, but that ${target} goal is in sight!`,
		],
		good: [
			`You are on your way to meeting your target of ${target}.`,
			`The first steps are the most important, you are taking your first steps to your ${target} goal!`,
		],
		better: [
			`You are killing this, you will reach your ${target} goal in no time!`,
			`You got this! You'll be achieving ${target} in no time flat.`,
		],
	}

	const getMessage = (pct) => {
		const getRandomMessage = (list) => {
			return list[Math.floor(Math.random() * list.length)]
		}

		let msg
		if (pct < 1) {
			msg = getRandomMessage(messages.basic)
		} else if (pct < 25) {
			msg = getRandomMessage(messages.good)
		} else {
			msg = getRandomMessage(messages.better)
		}

		return <p className="ProgressBar__text">{msg}</p>
	}

	return (
		<>
			<div className="ProgressBar">
				<div className="ProgressBar__progress" style={css}>
					<span className="ProgressBar__value">{progress}%</span>
				</div>
			</div>

			{getMessage(percentage)}
		</>
	)
}

export default ProgressBar
