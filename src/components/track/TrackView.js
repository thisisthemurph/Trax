import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { Button } from "../form-components"
import TrackChart from "./TrackChart"
import TrackTable from "./TrackTable"
import { UserContext } from "../../context/UserContext"
import NewTrackPointForm from "../forms/NewTrackPointForm"
import Popup from "../Popup"

import "./TrackView.scss"
import "../form-components/Button.scss"
import ProgressBar from "./ProgressBar"

const TrackView = () => {
	const { trackId } = useParams()

	const [loading, setLoading] = useState(true)
	const [track, setTrack] = useState({})
	const [data, setData] = useState([])
	const [trackProgress, setTrackProgress] = useState(null)
	const [activeButton, setActiveButton] = useState("max")
	const [showTrackPointPopup, setShowTrackPointPopup] = useState(false)
	const [error, setError] = useState("")

	const [user] = useContext(UserContext)

	useEffect(() => {
		const getTrack = async (trackId, token) => {
			try {
				const res = await fetch(`http://localhost:5000/trax/api/tracks/${trackId}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"auth-token": token,
					},
				})

				const _track = await res.json()

				if (_track) {
					setTrack(_track)
					setData(_track.data.dataPoints)

					if ("target" in _track.data) {
						const target = _track.data.target
						const lastPoint = _track.data.dataPoints[_track.data.dataPoints.length - 1]
						setTrackProgress((lastPoint.value / target) * 100)
					}
				}

				setLoading(false)
			} catch (err) {
				setError(
					"There has been a problem loading your data at this time, please ensure that this Track still exists."
				)
				setLoading(false)
			}
		}

		if (user && user.token) {
			getTrack(trackId, user.token)
		}
	}, [trackId, user, loading])

	const filterData = (number, measurement) => {
		const past = moment().subtract(number, measurement)
		setData(track.data.dataPoints.filter((point) => moment(point.timestamp) > past))
		setActiveButton(`${number}${measurement}`)
	}

	const resetData = () => {
		setData(track.data.dataPoints)
		setActiveButton("max")
	}

	if (loading) {
		return <p>Loading...</p>
	}

	if (error) {
		return (
			<>
				<h2>Oops, somethings up...</h2>
				<p>{error}</p>
			</>
		)
	}

	const renderPopupForm = () => {
		return (
			<Popup
				heading="Add a new point..."
				show={showTrackPointPopup}
				onClose={() => {
					setShowTrackPointPopup(false)
				}}
			>
				<NewTrackPointForm
					trackId={trackId}
					onSuccess={() => {
						setShowTrackPointPopup(false)
						setLoading(true)
					}}
				/>
			</Popup>
		)
	}

	if (track.data.dataPoints.length > 1) {
		return (
			<>
				{renderPopupForm()}

				<div className="trackheader">
					<h1 className="trackheader__title">{track.name}</h1>
					<div className="trackheader__buttons">
						<Button
							circle
							text="+"
							onClick={() => {
								setShowTrackPointPopup(true)
							}}
						/>

						<div className="filter-buttons">
							<Button
								text="30d"
								active={activeButton === "30days"}
								onClick={() => filterData(30, "days")}
							/>
							<Button
								text="3m"
								active={activeButton === "3months"}
								onClick={() => filterData(3, "months")}
							/>
							<Button
								text="6m"
								active={activeButton === "6months"}
								onClick={() => filterData(6, "months")}
							/>
							<Button
								text="1y"
								active={activeButton === "1years"}
								onClick={() => filterData(1, "years")}
							/>
							<Button
								text="max"
								active={activeButton === "max"}
								onClick={() => resetData()}
							/>
						</div>
					</div>
				</div>

				<TrackChart data={data} />

				{trackProgress !== null ? <ProgressBar percentage={trackProgress} /> : null}

				<TrackTable data={data} />
			</>
		)
	} else {
		return <p>You need to add some points to this Track</p>
	}
}

export default TrackView
