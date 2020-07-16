import React, { useState, useContext } from "react"
import { Input, Button, GhostButton } from "../form-components"

import { addPointToTrack, updatePoint } from "../../api/track"
import { UserContext } from "../../context/UserContext"

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

		const newPoint = {
			dataPoints: [
				{
					value,
					timestamp: date,
				},
			],
		}

		const success = await addPointToTrack(user, trackId, newPoint)

		if (success) {
			onSuccess()
		} else {
			setError(
				"There seem to be problems adding this data to the database, maybe try again..."
			)
		}
	}

	const handlePointUpdate = async (pointId) => {
		if (!(value && date)) {
			setError("Please fill the  entire form")
			return
		}

		const newPointData = { value, timestamp: date }
		const success = updatePoint(user, trackId, pointId, newPointData)

		if (success) {
			onSuccess()
		} else {
			throw Error("Could not update the point")
		}
	}

	const submitHandler = async () => {
		if (process === "ADD_NEW_TRACK_POINT") {
			submitNewPoint()
		} else if (process === "EDIT_TRACK_POINT") {
			handlePointUpdate(pointId)
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
