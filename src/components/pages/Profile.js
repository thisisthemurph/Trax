import React, { useState } from "react"
import { FloatingActionButton } from "../form-components"
import TrackList from "../TrackList"
import Popup from "../Popup"
import NewTrackForm from "../forms/NewTrackForm"
import { Button } from "../form-components"

import "./Profile.scss"

const ProfilePage = () => {
	const [showNewTrackForm, setShowNewTrackForm] = useState(false)
	const [editTrack, setEditTrack] = useState(null)
	const [showEditForm, setShowEditForm] = useState(false)
	const [refreshTrackList, setRefreshTrackList] = useState(false)

	return (
		<div className="container">
			<div className="profile-header">
				<h1>Track Profile</h1>
				<div className="profile-header__button">
					<Button onClick={() => setShowNewTrackForm(true)}>New track</Button>
				</div>
				<FloatingActionButton
					onClick={() => setShowNewTrackForm(true)}
					hidden={showNewTrackForm}
				>
					<PlusIcon />
				</FloatingActionButton>
			</div>

			<TrackList
				refresh={refreshTrackList}
				setEditTrack={setEditTrack}
				setShowEditForm={setShowEditForm}
			/>

			<Popup
				heading="Create a new track"
				show={showNewTrackForm}
				onClose={() => setShowNewTrackForm(false)}
			>
				<NewTrackForm
					onSuccess={() => {
						setShowNewTrackForm(false)
						setRefreshTrackList(!refreshTrackList)
					}}
				/>
			</Popup>

			<EditTrackPopupForm
				show={showEditForm}
				trackId={editTrack}
				onClose={() => {
					setShowEditForm(false)
					setEditTrack(null)
				}}
				onSuccess={() => {
					setShowEditForm(false)
					setRefreshTrackList(!refreshTrackList)
				}}
				track={editTrack}
			/>
		</div>
	)
}

const EditTrackPopupForm = ({ show, onClose, onSuccess, track }) => {
	if (!track) return null

	return (
		<Popup heading="Edit track information..." show={show} onClose={onClose}>
			<NewTrackForm edit onSuccess={onSuccess} track={track} />
		</Popup>
	)
}

const PlusIcon = () => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="feather feather-plus"
		>
			<line x1="12" y1="5" x2="12" y2="19"></line>
			<line x1="5" y1="12" x2="19" y2="12"></line>
		</svg>
	)
}

export default ProfilePage
