import Layout from "../views/Layout";

export default function Projects() {
	return (
		<Layout>
			<h1>Side-Projects</h1>

			<aside>
				<p>
					I like to tinker with side projects in my spare time. Here are a few
					that are publicly available.
				</p>
			</aside>

			<article>
				<h2>react-editable-label</h2>
				<p>
					<a href="https://www.npmjs.com/package/react-editable-label">
						Github project
					</a>
				</p>
				<p>
					A simple React component for switching between a text label and a text
					input.
				</p>
				<p>
					I wrote this to learn about publishing NPM packages and it turned out
					to fill a niche for a number of people.
				</p>
			</article>

			<article>
				<h2>PHP Features Cheatsheet</h2>
				<p>
					<a href="https://markbiek.github.io/php-features-cheatsheet/">
						The cheatsheet
					</a>
				</p>
				<p>
					I switch between projects using all different versions of PHP. I wrote
					this to help keep track of which features were added in which
					versions.
				</p>
			</article>

			<article>
				<h2>Dotfiles</h2>
				<p>
					<a href="https://github.com/markbiek/dotfiles">Github project</a>
				</p>
				<p>
					All of the various config files that I use. I put them in Github to
					make it easier to deploy on multiple machines <em>and</em> to
					potentially be of use to others.
				</p>
			</article>

			<article>
				<h2>Bad Teenage Poetry</h2>

				<p>
					<a href="https://badteenagepoetry.biek.dev/">
						badteenagepoetry.biek.dev
					</a>
				</p>
				<p>
					Another small site for learning about NextJS. Inspired by finding an
					archive of terrible poetry from high school.
				</p>
			</article>

			<article>
				<h2>Elementor Import/Export Tool</h2>
				<p>
					<a href="https://github.com/markbiek/elementor-import-export">
						Github project
					</a>
				</p>
				<p>
					This is a WordPress plugin which adds a new <code>wp</code> command to
					export and import Elementor post data.
				</p>
				<p>
					All Elementor-related metadata for the post is exported to a
					PHP-serialized file which can the be imported using the other{" "}
					<code>wp</code> command.
				</p>
			</article>

			<article>
				<h2>WPEngine Helper</h2>
				<p>
					<a href="https://github.com/markbiek/wpe-helper">Github project</a>
				</p>
				<p>
					This is a console tool (written in PHP with Laravel Zero) for
					interacting with WPEngine sites.
				</p>
			</article>
		</Layout>
	);
}
