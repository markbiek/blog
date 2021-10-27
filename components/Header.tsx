import Link from 'next/link';

import styles from '../styles/Header.module.css';

export default function Header() {
	return (
		<>
			<div className={styles.header}>
				<nav className={styles.nav}>
					<ul>
						<li>
							<Link href='https://mark.biek.org/cv'>
								<a>Hire Me</a>
							</Link>
						</li>
						<li>
							<Link href='https://mark.biek.org/projects'>
								<a>Projects</a>
							</Link>
						</li>
						<li>
							<Link href='https://github.com/markbiek'>
								<a>Code</a>
							</Link>
						</li>
					</ul>
				</nav>
				<p>
					My name is
					<Link href='/'>
						<a>Mark Biek</a>
					</Link>
					and I am a software developer, currently in Louisville, KY. I like to
					work with smart, kind people making beautiful and interesting things.
				</p>
				<p className={styles.small}>
					I also blog for
					<Link href='https://viastudio.com/author/mark/'>
						<a>VIA Studio!</a>
					</Link>
				</p>
			</div>
		</>
	);
}
