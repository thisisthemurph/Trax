import React, { useState, useContext } from "react"
import { Input, Button } from "../form-components"
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
			<Input placeholder="Name" value={name} onChange={(value) => setName(value)} />
			<div className="inputContainer">
				<select name="track-type-select" onChange={(e) => setTrackType(e.target.value)}>
					<option value="weight">Weight</option>
					<option value="distance">Distance</option>
					<option value="time">Time</option>
				</select>
			</div>
			<Button text="Create" onClick={() => submitHandler()} />
		</div>
	)
}

export default NewTrackForm
