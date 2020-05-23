import React, { useState, useContext } from "react"
import { Input, Button } from "../form-components"

import { UserContext } from "../../context/UserContext"

const NewTrackPointForm = ({ trackId, onSuccess }) => {
	const today = new Date()
	const d = String(today.getDate()).padStart(2, "0")
	const m = String(today.getMonth() + 1).padStart(2, "0")
	const y = `${today.getFullYear()}`

	const [value, setValue] = useState("")
	const [date, setDate] = useState(`${y}-${m}-${d}`)
	const [error, setError] = useState(null)

	const [user] = useContext(UserContext)

	const submitHandler = async () => {
		if (!(value && date)) {
			setError("Please fill the  entire form")
			return
		}

		const postData = {
			dataPoints: [
				{
					value,
					timestamp: date,
				},
			],
		}

		try {
			const res = await fetch(`http://localhost:5000/trax/api/tracks/${trackId}`, {
				method: "POST",
				headers: {
					Accepts: "application/json",
					"Content-Type": "application/json",
					"auth-token": user.token,
				},
				body: JSON.stringify(postData),
			})

			const result = await res.json()

			if (result && result.success) {
				onSuccess()
			} else {
				setError(
					"There seem to be problems adding this data to the database, maybe try again..."
				)
			}
		} catch (e) {
			setError("Something unexpected has happened, maybe try refreshing :?")
		}
	}

	return (
		<div className="form">
			<Input type="number" value={value} onChange={(value) => setValue(value)} />
			<div>
				<Input
					type="date"
					value={date}
					onChange={(e) => {
						setDate(e.target.value)
					}}
				/>
			</div>

			<Button text="Add point" onClick={submitHandler} />

			{error && <p className="error">{error}</p>}
		</div>
	)
}

export default NewTrackPointForm
