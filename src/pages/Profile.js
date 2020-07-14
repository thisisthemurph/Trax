import React, { useState } from "react"

import TrackList from "../components/track-list"
import Popup from "../components/popup"
import { NewTrackForm } from "../components/forms"
import { Button, FloatingActionButton } from "../components/form-components"
import { PlusIcon } from "../components/icons"

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
					onCancel={() => setShowNewTrackForm(false)}
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
			<NewTrackForm edit onSuccess={onSuccess} track={track} onCancel={onClose} />
		</Popup>
	)
}

export default ProfilePage
