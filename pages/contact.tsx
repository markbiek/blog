import Layout from "../views/Layout";

export default function Contact() {
	return (
		<Layout>
			<article>
				<h1>Contact Me</h1>

				<ul>
					<li>
						<a href="mailto:info@biek.org">info@biek.org</a>
					</li>
					<li>
						<a href="https://github.com/markbiek">Github</a>
					</li>
				</ul>
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
		</Layout>
	);
}
