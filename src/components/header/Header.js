import React from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"

import "./Header.scss"

const Header = () => {
	return (
		<header className="Header container">
			<div className="logo">
				<Link to="/">
					<h1>Trax</h1>
				</Link>
			</div>

			<Navigation />
		</header>
	)
}

export default Header
