import Link from 'next/link';

import styles from '../styles/Footer.module.css';

export default function Footer() {
	return (
		<footer className={styles.footer}>
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
				<p>Sometimes I make things</p>
			</article>
		</footer>
	);
}
