import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { verifyUserToken } from "../auth/Auth"

import { UserContext } from "../context/UserContext"

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	const [user, setUser] = useContext(UserContext)

	if (!user) {
		const token = localStorage.getItem("token")

		if (token) {
			;(async () => {
				const user = await verifyUserToken(token)
				setUser(() => user)
			})()
		}
	}

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
