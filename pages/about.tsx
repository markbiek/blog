import Link from 'next/link';

import Layout from '../views/Layout';

export default function About() {
	return (
		<Layout>
			<article>
				<h1>About Me</h1>
				<p>😄 Pronouns: he/him</p>
				<p>#BlackLivesMatter</p>
				<p>
					I've been working full time as a software developer since 1998 and I
					love the intellectual thrill of writing code and solving problems.
				</p>

				<p>
					I firmly believe that the days of a developer working by themself in a
					room are over. Software Development is all about collaboration. The
					ability to work with other developers and clients is just as important
					as the ability to write code. I love to work with awesome, smart
					people making beautiful and exciting things. I love making things that
					people will use and enjoy.
				</p>

				<p>I am not a great programmer.</p>

				<p>I am a middle-of-the-road programmer.</p>

				<p>
					I don’t think I’m a 10x programmer (if they even{' '}
					<a href='https://duckduckgo.com/?q=10x+programmer+myth&t=newext&atb=v252-1&ia=web'>
						exist
					</a>
					). I am not changing the world. I never invented a programming
					language or wrote a really amazing piece of software that everyone
					knows about.
				</p>

				<p>So I have to make up for it other ways.</p>

				<ul>
					<li>I write decent code (mostly).</li>
					<li>I document things.</li>
					<li>I accept criticism.</li>
					<li>I’m always learning.</li>
					<li>I can stay organized in a large project.</li>
					<li>I work well with people, especially non-technical people.</li>
					<li>
						I can be an advocate for a talented team member who is being
						overlooked or mentor Junior developers.
					</li>
					<li>I can deal with jerks without getting upset.</li>
					<li>
						I can get things done. If there is a roadblock or someone is stuck,
						I can generally get things moving again I’m going to bring value to
						the table in whatever way I can.
					</li>
				</ul>
			</article>
			<article>
				<h2 id='alf'>What's with "antelopelovefan"?</h2>
				<p>
					The short version is that it dates back to my BBS days in the early
					90's.
				</p>
				<p>
					The long version is told in{' '}
					<Link href='/2009/02/a-refugee-from-the-world/'>
						<a>"A refugee from the world"</a>
					</Link>
					.
				</p>
			</article>
		</Layout>
	);
}
