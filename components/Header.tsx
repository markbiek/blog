import Link from 'next/link';

export default function Header() {
	return (
		<>
			<h1>
				<Link href='/'>
					<a>Blog</a>
				</Link>
			</h1>
		</>
	);
}
