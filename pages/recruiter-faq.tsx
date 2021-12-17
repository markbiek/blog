import Link from 'next/link';
import Image from 'next/image';

import Layout from '../views/Layout';

export default function About() {
	return (
		<Layout>
			<article>
				<h1>FAQ for Recruiters</h1>

				<p>
					Are you a recruiter who's interested in contacting me about a job?
				</p>
				<p>
					I'm excited to hear from you! You may find it helpful to review these
					commonly asked questions:
				</p>

				<dl>
					<dt>Tell me about yourself!</dt>
					<dd>
						I've been a professional software developer for almost 25 years.
					</dd>

					<dt>Why are you leaving your current position?</dt>
					<dd>
						While I love my job and the people I work with, I've maxed out the
						role I'm currently in. I want to keep growing as a developer and all
						of my growth opportunities in my current position are managerial.
					</dd>

					<dt>What are you looking for?</dt>
					<dd>
						I'm looking for a place where I can continue to grow and learn as a
						developer. I also enjoying mentoring junior developers and helping
						them grow in their careers.
					</dd>

					<dt>Do you want full-time or contract?</dt>
					<dd>
						My preference is full-time and fully remote but I'm open to
						contract-to-hire. I would also entertain contract-only for the right
						opportunity.
					</dd>

					<dt>What type of development do you do? Backend or Frontend?</dt>
					<dd>
						My specialty is backend development with a focus on PHP (usually
						Laravel or WordPress). I also have extensive JavaScript and ReactJS
						experience and have worked on a few small VueJS projects.
					</dd>

					<dt>How many years working with PHP?</dt>
					<dd>
						Over 20 years. My first exposure to it was PHP 3 in the late 1990s.
					</dd>

					<dt>How many years working with JavaScript?</dt>
					<dd>
						Over 15 years. I started with vanilla JS, PrototypeJS, lots of
						jQuery and now generally work in vanilla ES6 JavaScript. I have done
						a number of small NodeJS projects over the last 6 years.
					</dd>

					<dt>How many years working with ReactJS</dt>
					<dd>
						6 years. At VIA Studio, I've done lots of small React-based user
						experience. We've also built several large single-page applications
						including a concert ticketing app for Kentucky Performing Arts.
					</dd>

					<dt>What's your base salary?</dt>
					<dd>
						I have some flexibility depending on the total offer package.
						Ideally, I'd like to know what range a company has budgeted for a
						particular role.
					</dd>
				</dl>
			</article>
		</Layout>
	);
}
