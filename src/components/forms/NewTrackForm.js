import React, { useState, useContext } from "react"
import { Input, Button, SelectInput } from "../form-components"
import { UserContext } from "../../context/UserContext"

const NewTrackForm = ({ onSuccess }) => {
	const [name, setName] = useState("")
	const [trackType, setTrackType] = useState("weight")

	const [user] = useContext(UserContext)

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
			console.error("There has been an error!")
			console.error(e)
		}
	}

	return (
		<div className="form">
			<Input
				label="Track name"
				autoFocus={true}
				value={name}
				onChange={(value) => setName(value)}
			/>

			<SelectInput
				label="New track type"
				name="track-type-select"
				onChange={(value) => setTrackType(value)}
				options={{
					weight: "Weight",
					distance: "Distance",
					time: "Time",
				}}
			/>

			<SubForm type={trackType} />

			<Button text="Create" onClick={() => submitHandler()} />
		</div>
	)
}

const SubForm = ({ type }) => {
	switch (type) {
		case "distance":
			return <DistanceSubForm />
		case "time":
			return <TimeSubForm />
		default:
			return <WeightSubForm />
	}
}

const WeightSubForm = () => {
	return <Input label="Track Aim" />
}

const DistanceSubForm = () => {
	return <p>DISTANCE SUB FORM</p>
}

const TimeSubForm = () => {
	return <p>Time SUB FORM</p>
}

export default NewTrackForm
