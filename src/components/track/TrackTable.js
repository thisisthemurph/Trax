import React, { useState } from "react"
import moment from "moment"
import Popup from "../Popup"
import NewTrackPointForm from "../forms/NewTrackPointForm"

import "./TrackTable.scss"

function TrackTable({ trackId, data, deleteHandler, setLoading }) {
	const [checked, setChecked] = useState({})
	const [pointToUpdate, setPointToUpdate] = useState(null)

	const clickHandler = (pointId) => {
		setChecked({
			...checked,
			[pointId]: checked[pointId] ? !checked[pointId] : true,
		})
	}

	return (
		<>
			<div className="TrackTable">
				<table>
					<thead>
						<tr>
							<th className="checkbox">
								<input type="checkbox" />
							</th>
							<th>Date</th>
							<th>Value</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.map((point) => {
							const date = moment(point.timestamp).format("Do MMMM YYYY")
							const value = `${point.value}KG`

							return (
								<tr
									key={point._id}
									className={checked[point._id] ? "checked" : "unchecked"}
									onClick={() => clickHandler(point._id)}
								>
									<td className="checkbox">
										<input type="checkbox" />
									</td>
									<td>{date}</td>
									<td>{value}</td>
									<td>
										<a
											href="/profile"
											onClick={(e) => {
												e.preventDefault()
												deleteHandler(point._id)
											}}
										>
											del
										</a>
									</td>
									<td>
										<a
											href="/profile"
											onClick={(e) => {
												e.preventDefault()
												setPointToUpdate(point)
											}}
										>
											update
										</a>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
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
		</>
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

export default TrackTable
