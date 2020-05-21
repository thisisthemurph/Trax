import React, { useState, useEffect, useContext } from "react"
import TrackListItem from "./TrackListItem"
import { UserContext } from "../context/UserContext"

const TrackList = () => {
	const [loading, setLoading] = useState(true)
	const [trackItems, setTrackItems] = useState([])

	const [user] = useContext(UserContext)

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
			} catch (e) {
				setTrackItems([])
			}
		}

		if (user && user.token) {
			getTracks(user.id, user.token)
		}

		setLoading(false)
	}, [user])

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
