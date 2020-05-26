import React from "react"

import "./GenderElement.scss"

const GenderElement = ({ sex, updateSelected }) => {
	const maleFocusRef = React.createRef()
	const femaleFocusRef = React.createRef()

	const getClassNames = (selectorType) => {
		if (selectorType === sex) {
			return `selector selected`
		}

		return `selector`
	}

	const handleChange = (e) => {
		e.preventDefault()
		updateSelected(e.target.value)
	}

	return (
		<div className={"GenderElement"}>
			<div
				className={getClassNames("m")}
				onClick={() => maleFocusRef.current && maleFocusRef.current.focus()}
			>
				<input
					ref={maleFocusRef}
					type="radio"
					name="sex"
					value="m"
					checked={sex === "m"}
					onChange={handleChange}
					onFocus={() => {
						updateSelected("m")
					}}
				/>
				<span className="emoji" role="img" aria-label="male">
					🧔
				</span>
				<p className="text">Man</p>
			</div>

			<div
				className={getClassNames("f")}
				onClick={() => femaleFocusRef.current && femaleFocusRef.current.focus()}
			>
				<input
					ref={femaleFocusRef}
					type="radio"
					name="sex"
					value="f"
					checked={sex === "f"}
					onChange={handleChange}
					onFocus={() => {
						updateSelected("f")
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
