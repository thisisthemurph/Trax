import React, { useState, useEffect, useContext } from "react"

import { Input, Button, GhostButton, SelectInput } from "../form-components"

import { createTrack, updateTrack } from "../../api/track"
import { UserContext } from "../../context/UserContext"

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
		// eslint-disable-next-line
	}, [trackType])

	const doCreateNewTrack = async () => {
		if (!name) {
			alert("A name is required")
			return
		}

		const trackWasCreated = await createTrack(user, {
			name,
			type: trackType,
			data: { metric, target, increaseOrDecrease },
		})

		if (trackWasCreated) {
			onSuccess()
		} else {
			alert("There has been an issue creating your track")
		}
	}

	const doUpdateTrack = async (trackId) => {
		if (!name) {
			alert("A name is required")
			return
		}

		const wasUpdated = await updateTrack(user, trackId, {
			name,
			target,
			metric,
			increaseOrDecrease,
			type: trackType,
		})

		if (wasUpdated) {
			onSuccess()
		} else {
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
