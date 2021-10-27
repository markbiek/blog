import Link from 'next/link';

import Header from '../components/Header';

export default function Contact() {
	return (
		<main>
			<Header />

			<article>
				<h1>Contact Me</h1>

				<ul>
					<li>
						<a href='mailto:info@biek.org'>info@biek.org</a>
					</li>
					<li>
						<a href='https://github.com/markbiek'>Github</a>
					</li>
					<li>
						<a href='https://twitter.com/antelopelovefan'>@antelopelovefan</a>
						<br />
						<span className='small'>
							<Link href='/about#alf'>
								<a>(what's antelopelovefan?)</a>
							</Link>
						</span>
					</li>
					<li>
						<a href='https://twitter.com/explodingvim'>@explodingvim</a>
					</li>
				</ul>
			</article>
		</main>
	);
}
