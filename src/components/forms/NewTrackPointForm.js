import React, { useState, useContext } from "react"
import { Input, Button, GhostButton } from "../form-components"

import { UserContext } from "../../context/UserContext"

let API_URL
if (process.env.NODE_ENV === "production") {
	API_URL = process.env.REACT_APP_API_BASE_URL
} else {
	API_URL = process.env.REACT_APP_API_BASE_URL_DEV
}

const NewTrackPointForm = ({
	trackId,
	onSuccess,
	defaults = { timestamp: null, value: null },
	process = "ADD_NEW_TRACK_POINT",
	pointId,
	onCancel,
}) => {
	const baseDate = defaults.timestamp || new Date()
	const d = String(baseDate.getDate()).padStart(2, "0")
	const m = String(baseDate.getMonth() + 1).padStart(2, "0")
	const y = `${baseDate.getFullYear()}`

	const [value, setValue] = useState(defaults.value || "")
	const [date, setDate] = useState(`${y}-${m}-${d}`)
	const [error, setError] = useState(null)

	const [user] = useContext(UserContext)

	const submitNewPoint = async () => {
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
			const res = await fetch(`${API_URL}/tracks/${trackId}`, {
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

	const updatePoint = async (pointId) => {
		if (!(value && date)) {
			setError("Please fill the  entire form")
			return
		}

		const putData = { value, timestamp: date }

		try {
			const res = await fetch(`${API_URL}/tracks/${trackId}/point/${pointId}`, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"auth-token": user.token,
				},
				body: JSON.stringify(putData),
			})

			const response = await res.json()

			if (response && response.success) {
				onSuccess()
			} else {
				throw Error("Could not update the point")
			}
		} catch (err) {
			console.error(err)
			alert("It has not been possible to update the Track point at this time...")
		}
	}

	const submitHandler = async () => {
		if (process === "ADD_NEW_TRACK_POINT") {
			submitNewPoint()
		} else if (process === "EDIT_TRACK_POINT") {
			updatePoint(pointId)
		}
	}

	return (
		<form method="POST" className="form">
			<Input
				type="number"
				value={value}
				label="Point value"
				onChange={(value) => setValue(value)}
			/>
			<div>
				<Input
					type="date"
					value={date}
					label="Date"
					onChange={(value) => {
						setDate(value)
					}}
				/>
			</div>

			<GhostButton
				formButton={true}
				text="Cancel"
				onClick={(e) => {
					e.preventDefault()
					onCancel()
				}}
			/>
			<Button
				submitButton={true}
				text={process === "ADD_NEW_TRACK_POINT" ? "Add point" : "Update"}
				onClick={(e) => {
					e.preventDefault()
					submitHandler()
				}}
			/>

			{error && <p className="error">{error}</p>}
		</form>
	)
}

export default NewTrackPointForm
