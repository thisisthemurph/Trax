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
						const firstPoint = _track.data.dataPoints[0]
						const lastPoint = _track.data.dataPoints[_track.data.dataPoints.length - 1]

						const diff = firstPoint.value - target
						const progress = (lastPoint.value - firstPoint.value) * -1
						setTrackProgress((progress / diff) * 100)
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

	if (track.data.dataPoints.length < 1) {
		return (
			<>
				<div className="trackheader">
					<h1 className="trackheader__title">{track.name}</h1>
					<p>Enter your forst point to get this track going...</p>
				</div>

				<NewTrackPointForm
					trackId={trackId}
					onSuccess={() => {
						setLoading(true)
					}}
				/>
			</>
		)
	}

	return (
		<>
			<section className="container">
				<div className="trackheader">
					<h1 className="trackheader__title">{track.name}</h1>
					<div className="trackheader__buttons">
						<Button
							circle
							onClick={() => {
								setShowTrackPointPopup(true)
							}}
						>
							<PlusIcon />
						</Button>

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
			</section>

			{trackProgress && (
				<section className="container">
					<ProgressBar percentage={trackProgress} />
				</section>
			)}

			<section className="container">
				<TrackTable data={data} />
			</section>

			<NewTrackPointPopup
				show={showTrackPointPopup}
				trackId={trackId}
				onClose={() => setShowTrackPointPopup(false)}
				onSuccess={() => {
					setShowTrackPointPopup(false)
					setLoading(true)
				}}
			/>
		</>
	)
}

const NewTrackPointPopup = ({ show, trackId, onClose, onSuccess }) => {
	return (
		<Popup heading="Add a new point..." show={show} onClose={onClose}>
			<NewTrackPointForm trackId={trackId} onSuccess={onSuccess} />
		</Popup>
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

export default TrackView
