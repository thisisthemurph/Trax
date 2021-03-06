import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { TrashIcon, SlidersIcon, ChevronRightIcon } from "../icons"

function TrackListItem({ track, handleDelete, handleEdit }) {
	const { _id: trackId, name, type, updatedAt } = track
	const { dataPoints, metric } = track.data

	const pluralise = (num) => (num === 1 ? "" : "s")

	return (
		<section className="list-item">
			<h2 className="list-item__title">{name}</h2>
			<div className="list-item__content">
				<p>
					Contains {dataPoints.length} Track item{pluralise(dataPoints.length)}
				</p>
				<p className="list-item__type">
					<strong>Type:</strong> <span className="list-item__type-value">{type}</span> (
					{metric.toLowerCase()})
				</p>
			</div>

			<p className="list-item__timestamp">Updated {moment(updatedAt).fromNow()}</p>

			<TrackListItemNavigation
				trackId={trackId}
				handleDelete={(e) => {
					e.preventDefault()
					handleDelete(trackId)
				}}
				handleEdit={(e) => {
					e.preventDefault()
					handleEdit(track)
				}}
			/>
		</section>
	)
}

const TrackListItemNavigation = ({ trackId, handleDelete, handleEdit }) => {
	return (
		<nav className="list-item__nav">
			<a className="list-item__nav-item" href="/" onClick={handleDelete}>
				<TrashIcon />
			</a>
			<a className="list-item__nav-item" href="/" onClick={handleEdit}>
				<SlidersIcon />
			</a>
			<Link className="list-item__nav-item" to={`track/${trackId}`}>
				<ChevronRightIcon />
			</Link>
		</nav>
	)
}

export default TrackListItem
