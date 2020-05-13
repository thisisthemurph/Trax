import React, { useState } from "react"

import "./GenderElement.scss"

const GenderElement = (props) => {
	const [hasFocus, setHasFocus] = useState(false)

	const getClassNames = (sex) => {
		const specific = sex === "f" ? "femaleSelector" : "maleSelector"

		if (props.sex === sex) {
			return `selector ${specific} selected`
		}

		return `selector ${specific}`
	}

	const handleChange = (e) => {
		e.preventDefault()
		props.updateSelected(e.target.value)
	}

	return (
		<div className={`GenderElement${hasFocus ? " focused" : ""}`}>
			<div
				className={getClassNames("m")}
				onClick={() => props.updateSelected("m")}
			>
				<input
					type="radio"
					name="sex"
					value="m"
					checked={props.sex === "m"}
					onChange={handleChange}
					onFocus={() => {
						setHasFocus(true)
						props.updateSelected("m")
					}}
					onBlur={() => {
						setHasFocus(false)
					}}
				/>
				<span className="emoji" role="img" aria-label="male">
					🧔
				</span>
				<p className="text">Man</p>
			</div>

			<div
				className={getClassNames("f")}
				onClick={() => props.updateSelected("f")}
			>
				<input
					type="radio"
					name="sex"
					value="f"
					checked={props.sex === "f"}
					onChange={handleChange}
					onFocus={() => {
						setHasFocus(true)
						props.updateSelected("f")
					}}
					onBlur={() => {
						setHasFocus(false)
					}}
				/>
				<span className="emoji" role="img" aria-label="female">
					👩‍🦰
				</span>
				<p className="text">Woman</p>
			</div>
		</div>
	)
}

export default GenderElement
