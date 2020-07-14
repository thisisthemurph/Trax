import React from "react"
import { Link } from "react-router-dom"

import heroImage from "../images/hero-medium.jpg"

import "./Home.scss"

const HomePage = () => {
	return (
		<>
			<div className="hero">
				<div className="hero__content">
					<h1 className="hero__heading">Trax!</h1>
					<p className="hero__subtitle">Track the things that mean the most!</p>
					<Link to="/signup" className="link__cta">
						Let's get tracking!
					</Link>
				</div>
				<img className="hero__image" src={heroImage} alt="man running up steps" />
			</div>

			<div className="container">
				<section className="card-container">
					<article className="c-card">
						<header className="c-card__header">
							<h2>What is Trax?</h2>
						</header>
						<div className="c-card__body">
							<p>
								Track absolutely anything! Whether you want to track your running
								progress or you want to track your daily body weight, Trax is able
								to assist you and present some pretty nifty charts in the process.
							</p>
						</div>
					</article>

					<article className="c-card">
						<header className="c-card__header">
							<h2>Charts</h2>
						</header>
						<div className="c-card__body">
							<p>
								Tracking progress with charts is a great way to visualise trends
								over time. You can even target specific timeframes to get a better
								view of the progress you’re making.
							</p>
						</div>
					</article>

					<article className="c-card">
						<header className="c-card__header">
							<h2>Stats</h2>
						</header>
						<div className="c-card__body">
							<p>Do you know if you're going in the right direction?</p>
							<p>
								Set targets and gain a clear understanding on how close you are (or
								how much work there is left to do) to meet your goals.
							</p>
						</div>
					</article>
				</section>
			</div>
		</>
	)
}

export default HomePage
