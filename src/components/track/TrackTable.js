import React, { useState, useEffect } from "react"
import moment from "moment"
import Popup from "../Popup"
import NewTrackPointForm from "../forms/NewTrackPointForm"

import "./TrackTable.scss"
import { Button, GhostButton } from "../form-components"

function TrackTable({ trackId, data, deleteHandler, setLoading }) {
	const [checked, setChecked] = useState({})
	const [checkedCount, setCheckedCount] = useState(0)
	const [allChecked, setAllChecked] = useState(false)
	const [pointToUpdate, setPointToUpdate] = useState(null)
	const [pointToDelete, setPointToDelete] = useState(null)
	const [pointsToDelete, setPointsToDelete] = useState(false)

	const checkChangeHandler = (pointId) => {
		if (checked[pointId] === undefined || checked[pointId] === false) {
			setCheckedCount(checkedCount + 1)
		} else {
			setCheckedCount(checkedCount - 1)
		}

		setChecked({
			...checked,
			[pointId]: checked[pointId] ? !checked[pointId] : true,
		})
	}

	useEffect(() => {
		if (allChecked) {
			const newState = {}
			data.forEach((point) => {
				newState[point._id] = true
			})

			setChecked(newState)
			setCheckedCount(data.length)
		} else {
			setChecked({})
			setCheckedCount(0)
		}
	}, [data, allChecked])

	return (
		<div>
			<div className="table">
				<div className="table__options">
					<input
						type="checkbox"
						checked={allChecked}
						onChange={() => {
							setAllChecked(!allChecked)
						}}
					/>

					<div
						className={`table__options-items${
							checkedCount > 0 ? " table__options-items--show" : ""
						}`}
					>
						<TrashButton
							text={`Delete ${
								checkedCount === data.length ? "all" : checkedCount
							} items`}
							onClick={() => {
								for (const pointId in checked) {
									if (checked[pointId]) {
										// deleteHandler(pointId)
										setPointsToDelete(true)
									}
								}
							}}
						/>
					</div>
				</div>

				<div className="table__header">
					<div></div>
					<div>Date</div>
					<div>Value</div>
					<div></div>
				</div>

				{data.map((point) => {
					const date = moment(point.timestamp).format("Do MMMM YYYY")
					const value = `${point.value}KG`

					return (
						<div key={point._id} className="table__row">
							<div className="table__col">
								<label htmlFor={point._id}>
									<input
										type="checkbox"
										id={point._id}
										className="table__checkbox"
										checked={checked[point._id] || false}
										onChange={() => {
											checkChangeHandler(point._id)
										}}
									/>
								</label>
							</div>
							<div className="table__col">
								<label htmlFor={point._id}>{date}</label>
							</div>
							<div className="table__col">
								<label htmlFor={point._id}>{value}</label>
							</div>
							<div className="table__col table__buttons">
								<EditButton
									onClick={() =>
										setPointToUpdate(data.filter((p) => p._id === point._id)[0])
									}
								/>
								{/* <TrashButton onClick={() => deleteHandler(point._id)} /> */}
								<TrashButton onClick={() => setPointToDelete(point)} />
							</div>
						</div>
					)
				})}
			</div>

			{pointToUpdate && (
				<UpdatePointPopupForm
					trackId={trackId}
					point={pointToUpdate}
					show={pointToUpdate !== null}
					onClose={() => setPointToUpdate(null)}
					onSuccess={() => setLoading(true)}
				/>
			)}

			{pointToDelete && (
				<DeletePointPopupForm
					show={true}
					text="Once the point is delete, there is no turning back."
					cancel={() => setPointToDelete(null)}
					confirm={() => deleteHandler(pointToDelete._id)}
				/>
			)}

			<DeletePointPopupForm
				show={pointsToDelete}
				text={`Are you sure you want to delete ${checkedCount} points?`}
				cancel={() => setPointsToDelete(false)}
				confirm={() => {
					for (const pointId in checked) {
						if (checked[pointId]) {
							deleteHandler(pointId)
						}
					}
				}}
			/>
		</div>
	)
}

const DeletePointPopupForm = ({ show, text, cancel, confirm }) => {
	return (
		<Popup heading="Are you sure?" show={show} onClose={cancel}>
			<div>
				<p>{text}</p>
				<GhostButton onClick={cancel}>Cancel</GhostButton>
				<Button color="warning" onClick={confirm}>
					Delete
				</Button>
			</div>
		</Popup>
	)
}

const UpdatePointPopupForm = ({ trackId, point, show, onClose, onSuccess }) => {
	return (
		<Popup heading="Add a new point..." show={show} onClose={onClose}>
			<NewTrackPointForm
				trackId={trackId}
				onSuccess={onSuccess}
				defaults={{ timestamp: new Date(point.timestamp), value: point.value }}
				process="EDIT_TRACK_POINT"
				pointId={point._id}
			/>
		</Popup>
	)
}

const EditButton = ({ onClick }) => {
	return (
		<button className="iconbtn" onClick={onClick}>
			<span className="iconbtn__content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon edit-icon"
				>
					<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
					<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
				</svg>
			</span>
		</button>
	)
}

const TrashButton = ({ text, onClick }) => {
	return (
		<button className="iconbtn" onClick={onClick}>
			<span className="iconbtn__content">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="icon trash-icon"
				>
					<polyline points="3 6 5 6 21 6"></polyline>
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
				</svg>
				{text && <span>{text}</span>}
			</span>
		</button>
	)
}

export default TrackTable
