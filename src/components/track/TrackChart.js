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
						borderColor: "rgb(62, 185, 103)",
						backgroundColor: "transparent",
						data: points.map((point) => point.value),
					},
				],
			})
		}

		formatChartData(data)
	}, [data])

	return (
		<div className="TrackChart">
			<Line
				data={chartData}
				options={{
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
								},
							},
						],
						yAxes: [
							{
								gridLines: {
									display: false,
									drawBorder: false,
								},
							},
						],
					},
				}}
			/>
		</div>
	)
}

export default TrackChart
