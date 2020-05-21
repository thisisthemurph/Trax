import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"

import { UserContext } from "../context/UserContext"
import { verifyUserToken } from "../auth/Auth"

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

	return (
		<Route
			{...rest}
			render={(props) => (user ? <Component {...props} /> : <Redirect to="/profile" />)}
		/>
	)
}
