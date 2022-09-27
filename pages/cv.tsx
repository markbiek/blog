import Layout from "../views/Layout";

import styles from "../styles/CV.module.css";

export default function CV() {
	return (
		<Layout>
			<h1>Résumé</h1>

			<article>
				<p>
					Mark Biek
					<br />
					<a href="mailto:info@biek.org">info@biek.org</a>
					<br />
					+1 502-509-9545
					<br />
					<a href="https://mark.biek.org">mark.biek.org</a>
				</p>
			</article>

			<article>
				<h2>I don't have accounts on any freelance sites</h2>

				<p>
					If you happen to see a Mark Biek with my picture on Upwork or any
					other freelance sites, that's a fake profile. I don't currently do
					work through any freelance sites, though I am occasionally available
					for contract work.
				</p>
			</article>

			<article>
				<h2>Technologies</h2>

				<ul className={styles.technologies}>
					<li>PHP (vanilla, Laravel, Wordpress)</li>
					<li>JavaScript (vanilla, es6, typescript, jQuery), NodeJS</li>
					<li>ReactJS, Hooks API, Context API, NextJS, react-native</li>
					<li>Webpack, Mix, Vitae, Parcel</li>
					<li>HTML, CSS, SCSS, LESS</li>
					<li>SQL, Sanity, GraphQL, NoSQL</li>
					<li>AWS, Vercel</li>
					<li>WooCommerce, Shopify, BigCommerce, Swell</li>
					<li>Stripe, Authorize.Net, FirstData, Payeezy</li>
					<li>Vagrant, Docker</li>
					<li>Python</li>
					<li>C#/.NET</li>
				</ul>
			</article>

			<article>
				<h2>Places I've worked</h2>
				<h4 className={styles.job_title}>
					Senior Backend Engineer &mdash;
					<span className={styles.where}>
						<a href="https://automattic.com" className="company-link">
							Automattic{" "}
						</a>
					</span>{" "}
					<span className={styles.when}>(Feb 2022 - Present)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>wordpress, wordpress.com</span>
					<span className={styles.tag}>wp-calypso</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>es6</span>
					<span className={styles.tag}>react</span>
					<span className={styles.tag}>html/css</span>
					<span className={styles.tag}>less/scss</span>
					<span className={styles.tag}>webpack</span>
					<span className={styles.tag}>nodejs</span>
					<span className={styles.tag}>payment-processing</span>
				</p>
				<h4 className={styles.job_title}>
					Senior Backend Developer &mdash;
					<span className={styles.where}>
						<a href="https://viastudio.com" className="company-link">
							VIA Studio{" "}
						</a>
					</span>{" "}
					<span className={styles.when}>(Dec 2015 - Feb 2022)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>laravel</span>
					<span className={styles.tag}>laravel-nova</span>
					<span className={styles.tag}>inertia</span>
					<span className={styles.tag}>wordpress</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>es6</span>
					<span className={styles.tag}>react</span>
					<span className={styles.tag}>react-native</span>
					<span className={styles.tag}>nextjs</span>
					<span className={styles.tag}>vercel</span>
					<span className={styles.tag}>html/css</span>
					<span className={styles.tag}>less/scss</span>
					<span className={styles.tag}>webpack</span>
					<span className={styles.tag}>nodejs</span>
					<span className={styles.tag}>aws</span>
					<span className={styles.tag}>payment-processing</span>
				</p>
				<ul className={styles.did}>
					<li>
						Build custom websites using Laravel, WordPress, ReactJS and NextJS.{" "}
						<ul className={styles.subdid}>
							<li>Recent examples:</li>
							<li>
								Product subscription service for{" "}
								<a href="https://boilerwarehouse.com">
									WARE's boilerwarehouse.com
								</a>
								.
							</li>
							<li>
								Parts wishlist functionality for{" "}
								<a href="https://boilerwarehouse.com">
									WARE's boilerwarehouse.com
								</a>
								.
							</li>
							<li>
								Integration from WordPress to Salesforce for the{" "}
								<a href="https://staveandthief.com/">Stave & Thief Society</a>.
							</li>
							<li>
								Backend development and Sanity CMS integration for the
								redesigned <a href="https://via.studio">via.studio</a>.
							</li>
							<li>
								Developed the Kentucky Performing Arts Center ticketing ReactJS
								app (
								<a href="https://via.studio/work/kentucky-performing-arts-website">
									Case Study
								</a>
								,{" "}
								<a href="https://via.studio/journal/using-react-and-redux-to-build-the-kentucky-performing-arts-ticketing-experience">
									Tech Stack
								</a>
								).
							</li>
							<li>
								Developed redesigned air quality website for Louisville Air
								Watch (
								<a href="http://airqualitymap.louisvilleky.gov/">
									http://airqualitymap.louisvilleky.gov/
								</a>
								) including more efficient API layer.
							</li>
						</ul>
					</li>
					<li>
						Design large-scale ecommerce systems for clients{" "}
						<ul className={styles.subdid}>
							<li>Recent examples:</li>
							<li>
								<a href="https://scholarrx.com/">ScholarRx</a> &ndash;
								Simplified their ecommerce flow by moving to a headless
								ecommerce platform combined with a React SPA for cart/checkout.
							</li>
							<li>
								<a href="https://www.ridgerunner.com/">Ridge Runner</a> &ndash;
								Designed a vendor-focused store platform with an eye toward
								rapid vendor store setup.
							</li>
						</ul>
					</li>
					<li>
						Spearheaded project to sell custom WordPress plugins on{" "}
						<a href="https://plugins.viastudio.com">
							https://plugins.viastudio.com
						</a>
						. This included lead developer on the plugins themselves as well as
						the corresponding sales website.{" "}
					</li>
					<li>
						Development team manager and member of company leadership team{" "}
					</li>
					<li>Assist with client prospecting. </li>
					<li>Generate new business leads. </li>
					<li>Lead developer on large projects. </li>
					<li>Assist Project Managers with scheduling and sprint planning. </li>
					<li>Mentor Junior developers. </li>
					<li>Manage internal and cloud servers. </li>
					<li>
						Manage Vagrant, Docker, and Jenkins CI projects for internal
						development.{" "}
					</li>
				</ul>
				<h4 className={styles.job_title}>
					Senior Development Consultant &mdash;
					<span className={styles.where}>
						<a href="http://studymaker.com/" className="company-link">
							Studymaker, LLC{" "}
						</a>
					</span>{" "}
					<span className={styles.when}>(2002 - Present)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>react</span>
					<span className={styles.tag}>react-redux</span>
					<span className={styles.tag}>jquery</span>
					<span className={styles.tag}>laravel</span>
					<span className={styles.tag}>aws</span>
					<span className={styles.tag}>vb.net</span>
					<span className={styles.tag}>asp</span>
					<span className={styles.tag}>angularjs</span>
				</p>
				<ul className={styles.did}>
					<li>
						Development on Studymaker's EDC platform for tracking medical
						research study data.{" "}
						<ul className={styles.subdid}>
							<li>Including:</li>
							<li>
								Spearheaded initiative to migrate from PHP 5.6 to PHP 7.x.
							</li>
							<li>Added build process for modern Javascript and CSS.</li>
							<li>AWS S3 integration for large file storage.</li>
							<li>Mailgun integration for email sending.</li>
							<li>Overall refactoring and code-cleanup.</li>
						</ul>
					</li>
					<li>
						Design and maintain AWS architecture for HIPAA-compliant PHP
						application hosting including monitoring and deployment scripts.{" "}
					</li>
					<li>
						Wrote an AngularJS application for calculating Procalcitonin changes
						(
						<a
							href="https://www.brahms-pct-calculator.com/"
							target="_blank"
							rel="noreferrer"
						>
							https://www.brahms-pct-calculator.com/
						</a>
						). Involved close work with the FDA and a rapidly changing set of
						requirements – Studymaker, LLC. Worked on a data validation website
						built on top of the Redcap API. – Beth Israel Deaconess Medical
						Center, Harvard University. Wrote a mobile-friendly website for
						collecting patient medical information. Used by BIDMC doctors at the
						2012 Democratic Convention at their mobile treatment stations.{" "}
					</li>
					<li>
						Wrote PHP/Laravel/MySQL website for displaying data dashboards.
						Included custom REST API for pulling data together from multiple
						sources.{" "}
					</li>
					<li>
						Wrote a variety of PHP/MySQL websites for data collection. Data
						collected was used for studies to improve patient care through more
						efficient and accurate record keeping and to measure the
						effectiveness of new drugs.{" "}
					</li>
					<li>Managed Rackspace servers </li>
				</ul>
				<h4 className={styles.job_title}>
					Senior Development Consultant &mdash;
					<span className={styles.where}>
						<a href="https://negotiation-360.com" className="company-link">
							Negotation360{" "}
						</a>
					</span>{" "}
					<span className={styles.when}>(May 2020 - Dec 2020)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>laravel</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>es6</span>
					<span className={styles.tag}>react</span>
					<span className={styles.tag}>react-native</span>
					<span className={styles.tag}>aws</span>
				</p>
				<ul className={styles.did}>
					<li>
						After the initial developer left, took over api and admin website
						along with react-native mobile app{" "}
					</li>
					<li>Assist in recovery from credential leak </li>
					<li>Help manage and automate AWS setup </li>
				</ul>
				<h4 className={styles.job_title}>
					Senior Development Consultant &mdash;
					<span className={styles.where}>
						<a href="https://mmj.org/" className="company-link">
							ioVita{" "}
						</a>
					</span>{" "}
					<span className={styles.when}>(Jan 2018 - Sep 2019)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>laravel</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>es6</span>
					<span className={styles.tag}>react</span>
					<span className={styles.tag}>react-native</span>
					<span className={styles.tag}>html/css</span>
					<span className={styles.tag}>less/scss</span>
					<span className={styles.tag}>webpack</span>
					<span className={styles.tag}>gulp</span>
					<span className={styles.tag}>nodejs</span>
					<span className={styles.tag}>aws</span>
					<span className={styles.tag}>payment-processing</span>
					<span className={styles.tag}>python</span>
				</p>
				<ul className={styles.did}>
					<li>
						Assist off-shore team with best practices and system architecture{" "}
					</li>
					<li>Help manage and automate AWS and Progress HealthCloud setup </li>
				</ul>
				<h4 className={styles.job_title}>
					Senior Programmer Analyst &mdash;
					<span className={styles.where}>Kindred Healthcare</span>{" "}
					<span className={styles.when}>(Sep 2013 - Nov 2015)</span>
				</h4>
				<p>
					<span className={styles.tag}>c#</span>
					<span className={styles.tag}>.net</span>
					<span className={styles.tag}>lua</span>
					<span className={styles.tag}>python</span>
					<span className={styles.tag}>asp.net</span>
					<span className={styles.tag}>asp.net-mvc</span>
					<span className={styles.tag}>php</span>
				</p>
				<ul className={styles.did}>
					<li>
						Lead developer on custom Windows service to route data from an AIX
						interface to SQL Server. Service requires high availability in order
						to process millions of records daily. Improved performance by
						migrating static SQL INSERT calls to using MERGE statements using
						User-defined Table Types.{" "}
					</li>
					<li>
						Lead developer on ASP.NET Web forms site for generating custom SSRS
						reports.{" "}
					</li>
					<li>
						Lead developer on ASP.NET MVC website for calculating nursing
						staffing needs.{" "}
					</li>
					<li>
						Lead developer on ASP.NET MVC website which allows respiratory
						therapists to review ventilator data and submit records back to
						ProTouch (Kindred's EMR).{" "}
					</li>
					<li>
						Lead developer on a C# desktop application for monitoring servers
						running ProTouch. Application includes ability to send batch
						commands to multiple servers. I improved performance by rewriting
						the batch-send threading code to use the .NET TPL (Task Parallel
						Library).{" "}
					</li>
					<li>
						Wrote a responsive ACO physician/facility directory website using
						PHP/MySQL. This site required quick turn around and was used to
						demonstrate our group's development capabilities to the new company
						CIO.{" "}
					</li>
					<li>
						Implemented work queue and Windows service monitoring using Nagios.
						Previously, we wouldn't find out about queue failures for days. Now
						we have real-time alerts.{" "}
					</li>
					<li>
						Wrote an internal website to allow developers working on the
						ProTouch UI layer to easily review their display modules.{" "}
					</li>
					<li>
						Updated all .NET applications and websites to use config file
						transformations to easily deploy to different environments.
						Previously, developers had to manually modify the config files for
						each environment.{" "}
					</li>
					<li>
						Added automatic build numbers to each .NET application and website
						to allow for easy version tracking on release. Previously, it was
						difficult to know which version was running in Production.{" "}
					</li>
					<li>
						Helped manage an Intern from the UofL Speed School. This included
						assigning projects, reviewing code, and assisting with development.{" "}
					</li>
					<li>
						Helped spearhead an initiative to migrate from Visual Source Safe
						and Subversion to Git.{" "}
					</li>
				</ul>
				<h4 className={styles.job_title}>
					Senior Interactive Developer &mdash;
					<span className={styles.where}>Power Creative</span>{" "}
					<span className={styles.when}>(Aug 2008 - Sep 2013)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>jquery</span>
					<span className={styles.tag}>asp.net</span>
					<span className={styles.tag}>asp</span>
					<span className={styles.tag}>c#</span>
					<span className={styles.tag}>html</span>
					<span className={styles.tag}>css</span>
					<span className={styles.tag}>python</span>
					<span className={styles.tag}>appcelerator-titanium</span>
				</p>
				<h4 className={styles.job_title}>
					Senior Programmer Analyst &mdash;
					<span className={styles.where}>The Stevenson Company</span>{" "}
					<span className={styles.when}>(Sep 2002 - Aug 2008)</span>
				</h4>
				<p>
					<span className={styles.tag}>php</span>
					<span className={styles.tag}>javascript</span>
					<span className={styles.tag}>sas</span>
					<span className={styles.tag}>python</span>
					<span className={styles.tag}>wincross</span>
				</p>
				<h4 className={styles.job_title}>
					Software Developer &mdash;
					<span className={styles.where}>ZFrame Corporation</span>{" "}
					<span className={styles.when}>(Jan 2000 - Sep 2002)</span>
				</h4>
				<p>
					<span className={styles.tag}>c++</span>
					<span className={styles.tag}>palmos</span>
					<span className={styles.tag}>vbscript</span>
					<span className={styles.tag}>asp</span>
				</p>
				<h4 className={styles.job_title}>
					Software Developer &mdash;
					<span className={styles.where}>PinPoint Corporation</span>{" "}
					<span className={styles.when}>(Aug 1998 - Jan 2000)</span>
				</h4>
				<p>
					<span className={styles.tag}>vb6</span>
					<span className={styles.tag}>php</span>
				</p>
			</article>
		</Layout>
	);
}
