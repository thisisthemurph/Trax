import React from "react"
import InputContainer from "./InputContainer"

const SelectInput = ({ value, label, name, onChange, options, infoMessage }) => {
	const id = label.replace(/\s/g, "_").toLowerCase()

	return (
		<InputContainer id={id} label={label} infoMessage={infoMessage}>
			<select name={name} id={id} value={value} onChange={(e) => onChange(e.target.value)}>
				{Object.entries(options).map(([value, text]) => {
					return (
						<option key={value} value={value}>
							{text}
						</option>
					)
				})}
			</select>
		</InputContainer>
	)
}

export default SelectInput
