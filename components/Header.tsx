import Link from "next/link";
import { useRouter } from "next/router";

import Logo from "./Logo";

import styles from "../styles/Header.module.css";

export default function Header() {
	const router = useRouter();

	return (
		<>
			<Logo />
			<nav className={styles.nav}>
				<ul>
					<li>
						<Link href="/now">
							<a>Now</a>
						</Link>
					</li>
					<li>
						<Link href="/about">
							<a>About</a>
						</Link>
					</li>
					<li>
						<Link href="/cv">
							<a>Hire me</a>
						</Link>
					</li>
					<li>
						<Link href="/blog">
							<a>Blog</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
