import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import auth from "../auth/auth"

import "./Navigation.scss"

const Navigation = (props) => {
	const createNavigationLinks = () => {
		if (auth.isAuthenticated()) {
			return (
				<>
					<Link className="Navigation__link" to="/">
						Home
					</Link>
					<a
						href="/login"
						className="Navigation__link"
						onClick={(e) => {
							e.preventDefault()
							auth.logout()
							props.setLoggedIn(false)
						}}
					>
						Logout
					</a>
					<Link className="Navigation__link Navigation__link--button" to="/profile">
						{auth.user.name} {auth.user.sex === "f" ? "👩‍🦰" : "🧔"}
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
