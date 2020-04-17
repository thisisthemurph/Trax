import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import auth from '../auth/auth'

export const ProtectedRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => (
		auth.isAuthenticated() === true
			? <Component {...props} />
			: <Redirect to='/login' />
	)} />
)
