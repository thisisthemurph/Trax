import React, { useState, useEffect } from "react"
import TrackListItem from "./TrackListItem"
import auth from "../auth/auth"

const TrackList = () => {
	const [loading, setLoading] = useState(true)
	const [trackItems, setTrackItems] = useState([])

	useEffect(() => {
		const getTracks = async (userId, token) => {
			try {
				const res = await fetch(`http://localhost:5000/trax/api/tracks/user/${userId}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"auth-token": token,
					},
				})

				const tracks = await res.json()

				if (tracks) {
					setTrackItems(tracks)
				} else {
					setTrackItems([])
				}

				setLoading(false)
			} catch (e) {
				setTrackItems([])
			}
		}

		const token = auth.getToken()
		if (token !== null) {
			getTracks(auth.user.id, token)
		} else {
			setLoading(false)
		}
	}, [])

	return (
		<div className="TrackList">
			<h2>Your Current Tracks</h2>

			{loading ? (
				<p>Loading...</p>
			) : trackItems.length === 0 ? (
				<p>Make a new Track to see it here</p>
			) : (
				trackItems.map((track) => <TrackListItem key={track._id} track={track} />)
			)}
		</div>
	)
}

export default TrackList
