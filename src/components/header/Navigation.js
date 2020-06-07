import React, { useState, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { logout } from "../../auth/Auth"

import "./Navigation.scss"

const Navigation = () => {
	const history = useHistory()
	const [user, setUser] = useContext(UserContext)
	const [hidden, setHidden] = useState(true)

	const logoutHandler = (e) => {
		e.preventDefault()

		logout()
		setUser(null)

		history.push("/login")
	}

	return (
		<>
			<MainNavigation
				hidden={hidden}
				setHidden={setHidden}
				user={user}
				logoutHandler={logoutHandler}
			/>
			<SideNavigation
				hidden={hidden}
				setHidden={setHidden}
				user={user}
				logoutHandler={logoutHandler}
			/>
		</>
	)
}

const MainNavigation = ({ hidden, setHidden, user, logoutHandler }) => {
	return (
		<nav className="navigation">
			<NavigationLinks
				hidden={hidden}
				setHidden={setHidden}
				user={user}
				logoutHandler={logoutHandler}
			/>
		</nav>
	)
}

const SideNavigation = ({ hidden, setHidden, user, logoutHandler }) => {
	const navClasses = ["navigation", "side-navigation", hidden ? "side-navigation--hidden" : null]
		.map((c) => c)
		.join(" ")

	return (
		<nav className={navClasses}>
			<div className="navigation__container side-navigation__heading">
				<div>
					<h2>{`${user?.name}!` || "Hey!"}</h2>
				</div>
				<div className="emoji" onClick={() => setHidden(!hidden)}>
					<span role="img" aria-label="wave hand emoji">
						👋
					</span>
				</div>
			</div>
			<NavigationLinks
				hidden={hidden}
				setHidden={setHidden}
				user={user}
				logoutHandler={logoutHandler}
				navigationType="HAMBURGER"
			/>
		</nav>
	)
}

const NavigationLinks = ({ user, hidden, setHidden, logoutHandler, navigationType = "MAIN" }) => {
	const linkFactory = (title, to, isButton = false, onClick = null, burger = false) => {
		const classes = [
			"navigation__link",
			"navigation__container",
			isButton ? "navigation__link--button" : null,
			burger ? "navigation__burger" : null,
		]
			.map((c) => c)
			.join(" ")

		if (onClick === null) {
			onClick = () => setHidden(true)
		}

		return (
			<Link className={classes} to={to} onClick={onClick}>
				{title}
			</Link>
		)
	}

	const login = linkFactory("Login", "/login")
	const register = linkFactory("Sign up", "/signup", true)
	const home = linkFactory("Home", "/")
	const logout = linkFactory("Logout", "/login", false, logoutHandler)
	const hamburger = linkFactory(
		<HamburgerIcon />,
		"/profile",
		false,
		(e) => {
			e.preventDefault()
			setHidden(!hidden)
		},
		true
	)

	if (!user) {
		return (
			<div className="navigation__links navigation__links--persist">
				{login}
				{register}
			</div>
		)
	}

	if (navigationType === "HAMBURGER") {
		return (
			<div className="navigation__links">
				{home}
				{linkFactory("Profile", "/profile")}
				{logout}
			</div>
		)
	} else {
		return (
			<div className="navigation__links">
				{home}
				{logout}
				{linkFactory(`${user.name} ${user.sex === "f" ? "👩‍🦰" : "🧔"}`, "/profile", true)}
				{hamburger}
			</div>
		)
	}
}

const HamburgerIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<line x1="3" y1="12" x2="21" y2="12"></line>
			<line x1="3" y1="6" x2="21" y2="6"></line>
			<line x1="3" y1="18" x2="21" y2="18"></line>
		</svg>
	)
}

export default Navigation
