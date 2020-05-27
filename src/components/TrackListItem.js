import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

import "./TrackListItem.scss"

function TrackDetail({ track, handleDelete }) {
	const { _id: trackId, name, type, updatedAt } = track
	const { dataPoints } = track.data

	const pluralise = (num) => (num === 1 ? "" : "s")

	return (
		<div className="TrackListItem">
			<h3 className="TrackListItem__title">{name}</h3>
			<div className="TrackListItem__content">
				<p>
					Contains {dataPoints.length} Track item{pluralise(dataPoints.length)}
				</p>
				<p>Last updated {moment(updatedAt).fromNow()}</p>
				<p>{type}</p>
			</div>

			<TrackListItemNavigation
				trackId={trackId}
				handleDelete={(e) => {
					e.preventDefault()
					handleDelete(trackId)
				}}
			/>
		</div>
	)
}

const TrackListItemNavigation = ({ trackId, handleDelete }) => {
	return (
		<nav className="TrackListItem__nav">
			<a className="TrackListItem__nav-item" href="/" onClick={handleDelete}>
				<svg
					className="icon trash-icon"
					viewBox="0 0 16 16"
					fill="orangered"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
					/>
				</svg>
			</a>
			<Link className="TrackListItem__nav-item" to={`track/${trackId}`}>
				<svg
					className="icon info-icon"
					viewBox="0 0 16 16"
					fill="blue"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
					/>
					<path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
					<circle cx="8" cy="4.5" r="1" />
				</svg>
			</Link>
			<Link className="TrackListItem__nav-item" to={`track/${trackId}`}>
				<svg
					className="icon chevron-right-icon"
					viewBox="0 0 16 16"
					fill="black"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</Link>
		</nav>
	)
}

export default TrackDetail
