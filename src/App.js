import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"

import { verifyUserToken } from "./api/auth"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoginForm, RegistrationForm } from "./components/forms"
import Header from "./components/header"

import Home from "./pages/Home"
import Profile from "./pages/Profile"
import TrackView from "./pages/TrackView"

import { UserContext } from "./context/UserContext"

const App = () => {
	const [user, setUser] = useState(null)

	if (!user) {
		const token = localStorage.getItem("token")

		if (token) {
			;(async () => {
				const user = await verifyUserToken(token)
				setUser(() => user)
			})()
		}
	}

	return (
		<UserContext.Provider value={[user, setUser]}>
			<Header />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/login" render={(props) => <LoginForm {...props} />} />

				<Route exact path="/signup" component={RegistrationForm} />

				<ProtectedRoute exact path="/profile" component={Profile} />

				<ProtectedRoute exact path="/track/:trackId" component={TrackView} />

				<Route path="*">
					<h1>404!</h1>
					<h2>Ah Ah Ah!</h2>
					<h2>You didn't say the magic word!</h2>
				</Route>
			</Switch>
		</UserContext.Provider>
	)
}

export default App
