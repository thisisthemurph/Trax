import React, { useState } from "react"
import { Input, Button } from "../form-components"

import "./Form.scss"

function TrackForm(props) {
	const [name, setName] = useState("")
	const [types] = useState([
		{ label: "Weight", value: "weight" },
		{ label: "Length / Height", value: "length" },
		{ label: "Count", value: "count" },
	])
	const [selectedType, setSelectedType] = useState("weigth")

	return (
		<form>
			<p className="heading">Add a new Track</p>

			<Input
				type="text"
				placeholder="Track name"
				value={name}
				onChange={(value) => {
					setName(value)
				}}
			/>

			<div className="inputContainer">
				<select
					value={selectedType}
					onChange={(e) => setSelectedType(e.currentTarget.value)}
				>
					<option value="">-- select a Track type --</option>
					{types.map((type) => (
						<option key={type.label} value={type.value}>
							{type.label}
						</option>
					))}
				</select>
			</div>

			<Button
				text="Create Track"
				onClick={() => {
					alert(name)
				}}
			/>
		</form>
	)
}

export default TrackForm
