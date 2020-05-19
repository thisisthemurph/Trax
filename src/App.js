import React, { useState } from "react"
import { Switch, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { LoginForm, RegistrationForm } from "./components/forms"
import { Home, Profile } from "./components/pages"
import TrackView from "./components/track"
import Header from "./components/header"

import { UserContext } from "./context/UserContext"

const App = () => {
	const [user, setUser] = useState(null)

	return (
		<UserContext.Provider value={[user, setUser]}>
			<div className="App">
				<Header />

				<main>
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
				</main>
			</div>
		</UserContext.Provider>
	)
}

export default App
