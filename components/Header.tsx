import Link from 'next/link';

import styles from '../styles/Header.module.css';

export default function Header() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<Link href='/'>
						<a>Home</a>
					</Link>
				</li>
				<li>
					<Link href='/about'>
						<a>About</a>
					</Link>
				</li>
				<li>
					<Link href='/cv'>
						<a>Hire me</a>
					</Link>
				</li>
				<li>
					<Link href='/projects'>
						<a>Projects</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
