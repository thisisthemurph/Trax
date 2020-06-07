import React from "react"
import { Link } from "react-router-dom"
import Navigation from "./Navigation"

import "./Header.scss"

const Header = () => {
	return (
		<header className="header">
			<div className="container">
				<div className="header__logo">
					<Link to="/">
						<h1>Trax</h1>
					</Link>
				</div>

				<Navigation />
			</div>
		</header>
	)
}

export default Header
