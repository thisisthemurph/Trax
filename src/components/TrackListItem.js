import React from "react"
import { Link } from "react-router-dom"

import "./TrackListItem.scss"

function TrackDetail({ track }) {
	const { _id: id, name } = track
	const { dataPoints } = track.data

	const pluralise = (num) => (num === 1 ? "" : "s")

	const navigateToChart = () => {}

	return (
		<div className="TrackListItem" onClick={navigateToChart}>
			<h3 className="name">{name}</h3>
			<p>ID: {id}</p>
			<p>
				Contains {dataPoints.length} item{pluralise(dataPoints.length)}
			</p>
			<div className="TrackListItem__links">
				<Link to={`track/${id}`}>Visit ></Link>
			</div>
		</div>
	)
}

export default TrackDetail
