import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import "./index.scss"
import App from "./App"

ReactDOM.render(
	<React.StrictMode>
		<Router basename={"/projects/trax"}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
)
