import React from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"

import "./Header.scss"

const Header = (props) => {
	return (
		<header className="Header">
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
