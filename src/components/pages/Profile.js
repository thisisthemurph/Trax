import React, { useState } from "react"
import { FloatingActionButton } from "../form-components"
import TrackList from "../TrackList"
import Popup from "../Popup"
import NewTrackForm from "../forms/NewTrackForm"

const ProfilePage = () => {
	const [showNewTrackForm, setShowNewTrackForm] = useState(false)
	const [refreshTrackList, setRefreshTrackList] = useState(false)

	return (
		<>
			<TrackList refresh={refreshTrackList} />

			<FloatingActionButton onClick={() => setShowNewTrackForm(true)}>
				<PlusIcon />
			</FloatingActionButton>

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
		</>
	)
}

const PlusIcon = () => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="white"
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
