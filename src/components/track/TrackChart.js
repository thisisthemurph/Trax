import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import moment from "moment"

function TrackChart({ data }) {
	const [chartData, setChartData] = useState({})

	useEffect(() => {
		const formatChartData = (points) => {
			setChartData({
				labels: points.map((point) => moment(point.timestamp).format("MMMM Do")),
				datasets: [
					{
						label: "TEST",
						borderColor: "#0074D9",
						backgroundColor: "rgba(150, 197, 238, .6)",
						data: points.map((point) => point.value),
					},
				],
			})
		}

		formatChartData(data)
	}, [data])

	return (
		<div className="TrackChart">
			<Line data={chartData} />
		</div>
	)
}

export default TrackChart
