import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { NewTrackPointForm } from "../forms"
import { Button } from "../form-components"
import { PlusIcon } from "../icons"
import TrackChart from "./TrackChart"
import ProgressBar from "./ProgressBar"
import TrackTable from "./TrackTable"
import Popup from "../Popup"
import { UserContext } from "../../context/UserContext"

import "./TrackView.scss"

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
				const res = await fetch(`http://mmurphy.co.uk/trax/api/tracks/${trackId}`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"auth-token": token,
					},
				})

				const response = await res.json()

				if (response && response.success) {
					const trk = response.track

					setTrack(trk)
					setData(trk.data.dataPoints)

					if ("target" in trk.data && trk.data.dataPoints.length > 1) {
						const target = trk.data.target
						const firstPoint = trk.data.dataPoints[0]
						const lastPoint = trk.data.dataPoints[trk.data.dataPoints.length - 1]

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

	const deletePointHandler = async (pointId) => {
		try {
			const res = await fetch(
				`http://mmurphy.co.uk/trax/api/tracks/${trackId}/point/${pointId}`,
				{
					method: "DELETE",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						"auth-token": user.token,
					},
				}
			)

			const response = await res.json()

			if (response && response.success) {
				setLoading(true)
			} else {
				alert("There has been an issue deleting this Track point!")
			}
		} catch (err) {
			alert("It has not been possible to delete the Track point at this time...")
		}
	}

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
		<div className="container container__max">
			<section className="primary">
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

			{track.data.target && (
				<section className="primary">
					<ProgressBar
						percentage={trackProgress}
						target={`${track.data.target}${track.data.metric}`}
					/>
				</section>
			)}

			<section className="primary">
				<TrackTable
					trackId={trackId}
					data={data}
					deleteHandler={deletePointHandler}
					setLoading={setLoading}
				/>
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
		</div>
	)
}

const NewTrackPointPopup = ({ show, trackId, onClose, onSuccess }) => {
	return (
		<Popup heading="Add a new point..." show={show} onClose={onClose}>
			<NewTrackPointForm trackId={trackId} onSuccess={onSuccess} onCancel={onClose} />
		</Popup>
	)
}

export default TrackView
