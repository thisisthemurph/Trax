import React, { useState, useEffect, useContext } from "react"

import Popup from "../popup"
import TrackListItem from "./TrackListItem"
import { WarningButton, GhostButton } from "../form-components"

import { UserContext } from "../../context/UserContext"
import { getTracks, deleteTrack } from "../../api/track"

import "./TrackList.scss"

const TrackList = ({ refresh, setEditTrack, setShowEditForm }) => {
	const [loading, setLoading] = useState(true)
	const [trackItems, setTrackItems] = useState([])
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const [deleteTrackId, setDeleteTrackId] = useState(null)

	const [user] = useContext(UserContext)

	useEffect(() => {
		setLoading(true)
		;(async () => {
			if (user && user.token) {
				const tracks = await getTracks(user)
				setTrackItems(tracks)
			}
		})()

		setLoading(false)
	}, [user, refresh, loading])

	const handleDelete = async (trackId) => {
		setDeleteTrackId(() => trackId)
		setShowConfirmDelete(true)
	}

	const handleEdit = (trackId) => {
		setEditTrack(() => trackId)
		setShowEditForm(true)
	}

	const completeDeletion = async (trackId) => {
		const isDeleted = deleteTrack(user, trackId)

		if (isDeleted) {
			setLoading(true)
		} else {
			alert("It has not been possible to delete this track!")
		}

		setShowConfirmDelete(false)
		setDeleteTrackId(null)
	}

	const getTrackById = (trackId) => {
		if (!trackItems) return null

		const items = trackItems.filter((track) => track._id === trackId)
		if (items.length) {
			return items[0]
		} else {
			return null
		}
	}

	if (loading) return <p>Loading...</p>

	if (trackItems.length === 0)
		return (
			<>
				<p>WOW! So much empty...</p>
				<p>How about we create a new Track to have it fill some space?</p>
				<p>You can track just about anything, the possibilities are endless!</p>
			</>
		)

	return (
		<div className="tracklist">
			<div className="tracklist__items">
				{trackItems.map((track) => (
					<TrackListItem
						key={track._id}
						track={track}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
					/>
				))}
			</div>

			<ConfirmDelete
				show={showConfirmDelete}
				item={getTrackById(deleteTrackId)}
				onClose={() => setShowConfirmDelete(false)}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={() => completeDeletion(deleteTrackId)}
			/>
		</div>
	)
}

const ConfirmDelete = ({ show, item, onClose, onCancel, onConfirm }) => {
	if (item !== null) {
		return (
			<Popup heading="You sure?" show={show} onClose={onClose}>
				<p>Are you sure you want to delete the Track:</p>
				<p>
					<em>{item.name}</em>
				</p>
				<GhostButton text="Cancel" onClick={onCancel} />
				<WarningButton text="Yes" onClick={onConfirm} />
			</Popup>
		)
	} else {
		return null
	}
}

export default TrackList
