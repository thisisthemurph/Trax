import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { UserContext } from "../context/UserContext"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const [user] = useContext(UserContext)

	const redirectState = {
		pathname: "/login",
		state: { error: "Please log in to access your profile." },
	}

	return (
		<Route
			{...rest}
			render={(props) => (user ? <Component {...props} /> : <Redirect to={redirectState} />)}
		/>
	)
}
