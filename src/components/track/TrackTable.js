import React, { useState } from "react"
import moment from "moment"

import "./TrackTable.scss"

function TrackTable({ data }) {
	const [checked, setChecked] = useState({})

	return (
		<div className="TrackTable">
			<table>
				<thead>
					<tr>
						<th className="checkbox">
							<input type="checkbox" />
						</th>
						<th>DATE</th>
						<th>VALUE</th>
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
								onClick={() => {
									setChecked({
										...checked,
										[point._id]: checked[point._id]
											? !checked[point._id]
											: true,
									})
								}}
							>
								<td className="checkbox">
									<input type="checkbox" />
								</td>
								<td>{date}</td>
								<td>{value}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default TrackTable
