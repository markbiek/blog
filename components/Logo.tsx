import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Header.module.css';

export default function Logo() {
	return (
		<Link href='/'>
			<a className={styles.logo}>
				<Image
					src='https://static.biek.org/blog/img/mark-in-code.png'
					alt='Stylized line drawing of mark playing the flute'
					width={100}
					height={100}
				/>
			</a>
		</Link>
	);
}
