import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoginForm, RegistrationForm } from "./components/forms"
import { HomePage, ProfilePage } from "./components/pages"
import Header from "./components/header"
import TrackChart from "./components/chart/TrackChart"

import auth from "./auth/auth"

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		;(async () => {
			const success = await auth.authenticateCurrentToken()
			setIsLoggedIn(success)
		})()
	})

	return (
		<Router>
			<div className="App">
				<Header setLoggedIn={setIsLoggedIn} />

				<main>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>

						<Route
							exact
							path="/login"
							render={(props) => <LoginForm {...props} setLoggedIn={setIsLoggedIn} />}
						/>

						<Route exact path="/signup" component={RegistrationForm} />

						<ProtectedRoute exact path="/profile" component={ProfilePage} />

						<ProtectedRoute exact path="/track/:trackId" component={TrackChart} />

						<Route path="*">
							<h1>404!</h1>
							<h2>Ah Ah Ah!</h2>
							<h2>You didn't say the magic word!</h2>
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	)
}

export default App
