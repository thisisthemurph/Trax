import React, { useState, useEffect, useContext } from "react"
import { Input, Button, SelectInput } from "../form-components"
import { UserContext } from "../../context/UserContext"

const NewTrackForm = ({ onSuccess }) => {
	const [name, setName] = useState("")
	const [trackType, setTrackType] = useState("weight")
	const [metric, setMetric] = useState("g")
	const [target, setTarget] = useState("")
	const [increaseOrDecrease, setIncreaseOrDecrease] = useState("decrease")

	const [user] = useContext(UserContext)

	const metrics = {
		weight: {
			g: "g",
			kg: "KG",
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
	}, [metrics, trackType])

	const submitHandler = async () => {
		if (!name) {
			alert("A name is required")
			return
		}

		try {
			const res = await fetch("http://localhost:5000/trax/api/tracks/", {
				method: "POST",
				headers: {
					Accepts: "application/json",
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
				setName("")
			} else {
				alert("There has been an issue creating your track")
			}
		} catch (e) {
			alert("There has been an issue creating your track")
		}
	}

	return (
		<div className="form f-container">
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
					onChange={(value) => {
						setMetric(value)
					}}
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
				<Button text="Create" onClick={() => submitHandler()} />
			</div>
		</div>
	)
}

export default NewTrackForm
