import React, { useState, useEffect, useContext } from "react"
import TrackListItem from "./TrackListItem"
import Popup from "../components/Popup"
import { Button } from "../components/form-components"
import { UserContext } from "../context/UserContext"

const TrackList = ({ refresh }) => {
	const [loading, setLoading] = useState(true)
	const [trackItems, setTrackItems] = useState([])
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [deleteTrackId, setDeleteTrackId] = useState(null)

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

		setLoading(true)

		if (user && user.token) {
			getTracks(user.id, user.token)
		}

		setLoading(false)
	}, [user, refresh, loading])

	const handleDelete = async (trackId) => {
		setDeleteTrackId(() => trackId)
		setShowConfirmDelete(true)
	}

	const completeDeletion = async (trackId) => {
		const res = await fetch(`http://localhost:5000/trax/api/tracks/${trackId}`, {
			method: "DELETE",
			headers: {
				Accepts: "application/json",
				"Content-Type": "application/json",
				"auth-token": user.token,
			},
		})

		const response = await res.json()

		if (response.success) {
			setLoading(true)
		} else {
			alert("It has not been possible to delete this track!")
		}

		setShowConfirmDelete(false)
		setDeleteTrackId(null)
	}

	return (
		<div className="TrackList">
			<h2>Your Current Tracks</h2>

			{loading ? (
				<p>Loading...</p>
			) : trackItems.length === 0 ? (
				<p>Make a new Track to see it here</p>
			) : (
				trackItems.map((track) => (
					<TrackListItem key={track._id} track={track} handleDelete={handleDelete} />
				))
			)}

			<ConfirmDelete
				show={showConfirmDelete}
				onClose={() => setShowConfirmDelete(false)}
				onCalcel={() => setShowConfirmDelete(false)}
				onConfirm={() => completeDeletion(deleteTrackId)}
			/>
		</div>
	)
}

const ConfirmDelete = ({ show, onClose, onCancel, onConfirm }) => {
	return (
		<Popup heading="You sure?" show={show} onClose={onClose}>
			<div>
				<p>Are you sure you want to delete that?</p>
				<Button text="Cancel" onClick={onCancel} />
				<Button text="Yes" onClick={onConfirm} />
			</div>
		</Popup>
	)
}

export default TrackList
