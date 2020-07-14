import React, { useState, useEffect, useContext } from "react"
import { Input, Button, GhostButton, SelectInput } from "../form-components"
import { UserContext } from "../../context/UserContext"

let API_URL
if (process.env.NODE_ENV === "production") {
	API_URL = process.env.REACT_APP_API_BASE_URL
} else {
	API_URL = process.env.REACT_APP_API_BASE_URL_DEV
}

const NewTrackForm = ({ onSuccess, onCancel, edit = false, track = null }) => {
	const hasTrack = track !== null

	const [name, setName] = useState(hasTrack ? track.name : "")
	const [trackType, setTrackType] = useState(hasTrack ? track.type : "weight")
	const [metric, setMetric] = useState(hasTrack ? track.data.metric : "g")
	const [target, setTarget] = useState(hasTrack && track.data?.target ? track.data.target : "")
	const [increaseOrDecrease, setIncreaseOrDecrease] = useState(
		hasTrack ? track.data.increaseOrDecrease : "decrease"
	)

	const [user] = useContext(UserContext)

	const metrics = {
		weight: {
			g: "g",
			kg: "Kg",
			lb: "lb",
			stone: "Stone",
		},
		distance: {
			m: "Metres",
			km: "Km",
			ft: "ft",
			miles: "Miles",
		},
		time: { s: "Seconds", m: "Minutes", h: "Hours" },
	}

	/**
	 * Chooses the appropriate initial metric when the trackType is changed
	 */
	useEffect(() => {
		const firstMetric = Object.keys(metrics[trackType])[0]
		setMetric(firstMetric)
	}, [trackType])

	const doCreateNewTrack = async () => {
		if (!name) {
			alert("A name is required")
			return
		}

		try {
			const res = await fetch(`${API_URL}/tracks/`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					"auth-token": user.token,
				},
				body: JSON.stringify({
					name,
					type: trackType,
					data: { metric, target, increaseOrDecrease },
				}),
			})

			const result = await res.json()

			if (result && result.success) {
				onSuccess()
			} else {
				alert("There has been an issue creating your track")
			}
		} catch (e) {
			alert("There has been an issue creating your track")
		}
	}

	const doUpdateTrack = async (trackId) => {
		if (!name) {
			alert("A name is required")
			return
		}

		try {
			const res = await fetch(`${API_URL}/tracks/${trackId}`, {
				method: "PUT",
				headers: {
					Accepts: "application/json",
					"Content-Type": "application/json",
					"auth-token": user.token,
				},
				body: JSON.stringify({
					name,
					target,
					metric,
					increaseOrDecrease,
					type: trackType,
				}),
			})

			const result = await res.json()

			if (result && result.success) {
				onSuccess()
			} else {
				alert("There has been an issue updating your track")
			}
		} catch (e) {
			alert("There has been an issue updating your track")
		}
	}

	const submitHandler = async () => {
		if (edit) {
			doUpdateTrack(track._id)
		} else {
			doCreateNewTrack()
		}
	}

	return (
		<form method="POST" className="form f-container">
			<div className="f-container__span-full">
				<Input
					type="text"
					label="Track name"
					value={name}
					onChange={(value) => setName(value)}
					autoFocus={true}
					tabIndex={1}
				/>
			</div>
			<div className="f-container__span-half">
				<SelectInput
					label="Track type"
					name="track-type-select"
					onChange={(value) => setTrackType(value)}
					options={{
						weight: "Weight",
						distance: "Distance",
						time: "Time",
					}}
					value={trackType}
					tabIndex={2}
				/>

				<SelectInput
					label="Metric"
					name="metric-select"
					value={metric}
					onChange={(value) => setMetric(value)}
					options={metrics[trackType]}
					tabIndex={3}
				/>
			</div>

			<div className="f-container__span-half">
				<Input
					type="number"
					label={`Target (${metrics[trackType][metric]})`}
					value={target}
					infoMessage={`Enter your target goal in ${metrics[trackType][metric]}. If you don't have a specific target in mind, you can leave this blank and create one later.`}
					onChange={(value) => setTarget(value)}
					tabIndex={4}
				/>

				<SelectInput
					label="Increase or decrease"
					name="increase-decrease-select"
					infoMessage="Please select if you are aiming to increase or decrease weight"
					onChange={(value) => setIncreaseOrDecrease(value)}
					value={increaseOrDecrease}
					options={{
						decrease: "Decrease",
						increase: "Increase",
					}}
					tabIndex={5}
				/>
			</div>
			<div className="f-container__span-full">
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
					text={`${edit ? "Update" : "Create"}`}
					onClick={(e) => {
						e.preventDefault()
						submitHandler()
					}}
				/>
			</div>
		</form>
	)
}

export default NewTrackForm
