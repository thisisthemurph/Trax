import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Navigation from './components/Navigation'
import HomePage from './components/pages/HomePage'
import ProfilePage from './components/pages/ProfilePage'

import auth from './auth/auth'

class App extends Component {

	state = {
		isLoggedIn: false
	}

	async componentDidMount() {
		const success = await auth.authenticateCurrentToken()
		this.setState({ isLoggedIn: success })
		console.log(`@App -> Authentic token? ${success}`)
	}

	setLoggedIn = value => {
		this.setState({isLoggedIn: value})
	}

	render() {
		return (
			<Router>
				<div className='App'>
					<Navigation
						isLoggedIn={this.state.isLoggedIn}
						setLoggedIn={this.setLoggedIn}
					/>

					<main>
						<Switch>
							<Route exact path='/'>
								<HomePage />
							</Route>

							<Route
								exact
								path='/login'
								render={(props) => <LoginForm {...props} setLoggedIn={this.setLoggedIn} />}
							/>

							<Route
								exact
								path='/signup'
								component={RegistrationForm}
							/>

							<ProtectedRoute
								exact
								path='/profile'
								component={ProfilePage}
								isLoggedIn={this.state.isLoggedIn}
							/>

							<Route path='*'>
								<h1>404!</h1><h2>Ah Ah Ah!</h2><h2>You didn't say the magic word!</h2>
							</Route>
						</Switch>
					</main>
				</div>
			</Router>
		)
	}
}

export default App
