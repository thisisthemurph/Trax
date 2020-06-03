import React, { useState } from "react"
import moment from "moment"

import "./TrackTable.scss"

function TrackTable({ data, deleteHandler }) {
	const [checked, setChecked] = useState({})

	const clickHandler = (pointId) => {
		setChecked({
			...checked,
			[pointId]: checked[pointId] ? !checked[pointId] : true,
		})
	}

	return (
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
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TrackTable
