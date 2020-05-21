import React, { useState } from "react"
import { Input, Button } from "../form-components"

const NewTrackPointForm = () => {
	const today = new Date()
	const d = String(today.getDate()).padStart(2, "0")
	const m = String(today.getMonth() + 1).padStart(2, "0")
	const y = `${today.getFullYear()}`

	const [value, setValue] = useState("")
	const [date, setDate] = useState(`${y}-${m}-${d}`)

	return (
		<div>
			<Input type="number" value={value} onChange={(value) => setValue(value)} />
			<div>
				<input
					type="date"
					value={date}
					onChange={(e) => {
						setDate(e.target.value)
					}}
				/>
			</div>

			<Button text="Add point" />
		</div>
	)
}

export default NewTrackPointForm
