import Image from 'next/image';

import Link from 'next/link';

import Header from '../components/Header';

import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.whoami}>
				<Header />
				<article className={styles.hero}>
					<Image
						src='https://static.biek.org/blog/img/Mark-and-Junior.jpg'
						alt='Mark sitting with his dog Junior'
						width={400}
						height={400}
					/>
				</article>
				<article className={styles.article}>
					<h1>
						My name is Mark Biek and I am a software developer, currently in
						Louisville, KY.
					</h1>
					<h2>
						I like to work with smart, kind people making beautiful and
						interesting things.
					</h2>
				</article>
			</section>
			<section className={styles.links}>
				<article>
					<h3>
						<Link href='/about'>
							<a>About</a>
						</Link>
					</h3>
					<p>More about me</p>
				</article>
				<article>
					<h3>
						<Link href='/contact'>
							<a>Contact</a>
						</Link>
					</h3>
					<p>Where to find me</p>
				</article>
				<article>
					<h3>
						<Link href='/projects'>
							<a>Projects</a>
						</Link>
					</h3>
					<p>Sometimes I write things</p>
				</article>
			</section>
		</main>
	);
}
