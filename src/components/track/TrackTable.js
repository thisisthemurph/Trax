import React, { useState, useEffect } from "react"
import moment from "moment"
import Popup from "../Popup"
import { NewTrackPointForm } from "../forms"
import { TrashIcon, EditIcon } from "../icons"
import { WarningButton, GhostButton } from "../form-components"

import "./TrackTable.scss"

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
										setPointsToDelete(true)
									}
								}
							}}
						/>
					</div>
				</div>

				<div className="table__header">
					<div className="table__col"></div>
					<div className="table__col">Date</div>
					<div className="table__col">Value</div>
					<div className="table__col"></div>
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
					show={true}
					onClose={() => setPointToUpdate(null)}
					onSuccess={() => setLoading(true)}
				/>
			)}

			<DeletePointPopupForm
				show={pointToDelete}
				text="Once the point is delete, there is no turning back."
				cancel={() => setPointToDelete(null)}
				confirm={() => deleteHandler(pointToDelete._id)}
			/>

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
				<WarningButton onClick={confirm}>Delete</WarningButton>
			</div>
		</Popup>
	)
}

const UpdatePointPopupForm = ({ trackId, point, show, onClose, onSuccess }) => {
	return (
		<Popup heading="Edit this point" show={show} onClose={onClose}>
			<NewTrackPointForm
				trackId={trackId}
				onSuccess={onSuccess}
				onCancel={onClose}
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
				<EditIcon />
			</span>
		</button>
	)
}

const TrashButton = ({ text, onClick }) => {
	return (
		<button className="iconbtn" onClick={onClick}>
			<span className="iconbtn__content">
				<TrashIcon />
				{text && <span>{text}</span>}
			</span>
		</button>
	)
}

export default TrackTable
