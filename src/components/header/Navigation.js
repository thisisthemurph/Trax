import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { logout } from "../../auth/Auth"

import "./Navigation.scss"

const Navigation = () => {
	const history = useHistory()
	const [user, setUser] = useContext(UserContext)

	const logoutHandler = (e) => {
		e.preventDefault()

		logout()
		setUser(null)

		history.push("/login")
	}

	const createNavigationLinks = () => {
		if (user) {
			return (
				<>
					<Link className="Navigation__link" to="/">
						Home
					</Link>
					<a href="/login" className="Navigation__link" onClick={logoutHandler}>
						Logout
					</a>
					<Link className="Navigation__link Navigation__link--button" to="/profile">
						{user.name} {user.sex === "f" ? "👩‍🦰" : "🧔"}
					</Link>
				</>
			)
		} else {
			return (
				<>
					<Link className="Navigation__link" to="/login">
						Login
					</Link>
					<Link className="Navigation__link Navigation__link--button" to="/signup">
						Sign up
					</Link>
				</>
			)
		}
	}

	return (
		<nav className="Navigation">
			<div className="Navigation__links">{createNavigationLinks()}</div>
		</nav>
	)
}

export default Navigation
