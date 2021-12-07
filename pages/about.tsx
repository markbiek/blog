import Link from 'next/link';
import Image from 'next/image';

import Layout from '../views/Layout';

export default function About() {
	return (
		<Layout>
			<article>
				<h1>About Me</h1>
				<p>😄 Pronouns: he/him</p>
				<p>#BlackLivesMatter</p>

				<h2>Work-Me</h2>
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
				<h2>Not Work-Me</h2>

				<p>I love to make things!</p>
				<div className='image-grid'>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/concrete-pot.jpg'
							alt='Concrete pot sitting on a table'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/octopus-crochet.jpg'
							alt='A crocheted octopus ornament hanging on an Xmas tree'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/narwhal-crossstich.jpg'
							alt='A cross-stitched narwal'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/concrete-yarn-holder.jpg'
							alt='A concrete yarn holder with a big ball of yarn on it'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/bee-crochet.jpg'
							alt='A crocheted bumble bee'
							width='300'
							height='300'
						/>
					</div>
				</div>
				<p>and garden (outdoors and in)</p>
				<div className='image-grid'>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/garden-bounty.jpg'
							alt='Tomatoes of all sizes, peppers, and eggplant from my garden'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/garden-potatoes.jpg'
							alt='Potatoes from my garden'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/hydroponic-basil.jpg'
							alt='Hydroponic basil growing indoors in a plastic box'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/hydroponic-bucket.jpg'
							alt='Hydroponic peppers growing indoors in a bucket'
							width='300'
							height='300'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/hydroponic-wall.jpg'
							alt='Pipes attached to a wall with lettuce growing out of them'
							width='300'
							height='300'
						/>
					</div>
				</div>
				<p>
					and sometimes I <a href='instagram.com/markdrawscute/'>draw things</a>
				</p>
				<div className='image-grid'>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/shark-drawing.jpg'
							alt='A drawing of a very cute shark'
							width='200'
							height='200'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/cat-drawing.jpg'
							alt='A drawing of a very cute cat'
							width='200'
							height='200'
						/>
					</div>
				</div>
				<p>or occasionally dabble with electronics.</p>
				<p>
					This is a simple Z80-based computer (leaning heavily on the excellent
					videos at <a href='https://eater.net/6502'>https://eater.net/6502</a>)
				</p>
				<div className='image-grid'>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/elec1.jpg'
							alt='The beginnings of a simple Z80 chip computer on a breadboard'
							width='200'
							height='200'
						/>
					</div>
					<div className='image-grid-item'>
						<Image
							src='https://static.biek.org/blog/img/making/elec2.jpg'
							alt='Z80 breadboard computer with nicer wiring'
							width='200'
							height='200'
						/>
					</div>
				</div>
				<h3 id='alf'>
					What's with{' '}
					<a href='https://twitter.com/antelopelovefan'>"antelopelovefan"</a>?
				</h3>
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
