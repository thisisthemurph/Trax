import React, { Component } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ProtectedRoute } from "./components/ProtectedRoute"
import LoginForm from "./components/form/LoginForm"
import RegistrationForm from "./components/form/RegistrationForm"
import Header from "./components/header/Header"
import HomePage from "./components/pages/HomePage"
import ProfilePage from "./components/pages/ProfilePage"
import TrackChart from "./components/TrackChart"

import auth from "./auth/auth"

class App extends Component {
	state = {
		isLoggedIn: false,
	}

	async componentDidMount() {
		const success = await auth.authenticateCurrentToken()
		this.setState({ isLoggedIn: success })
	}

	setLoggedIn = (value) => {
		this.setState({ isLoggedIn: value })
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header />

					<main>
						<Switch>
							<Route exact path="/">
								<HomePage />
							</Route>

							<Route
								exact
								path="/login"
								render={(props) => (
									<LoginForm {...props} setLoggedIn={this.setLoggedIn} />
								)}
							/>

							<Route exact path="/signup" component={RegistrationForm} />

							<ProtectedRoute exact path="/profile" component={ProfilePage} />

							<ProtectedRoute exact path="/track/:trackId" component={TrackChart} />

							<ProtectedRoute exact path="/example" component={ExampleComponent} />

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
}

function ExampleComponent() {
	return <p>I'm an example!</p>
}

export default App
