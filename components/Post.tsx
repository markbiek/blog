import Link from 'next/link';
import dayjs from 'dayjs';

import { PostType } from '../types';

interface PostProps {
	post: PostType;
}
export default function Post({ post }: PostProps) {
	const { title, date, url, html } = post;

	const fmtDate = dayjs(date).format('YYYY-MM');

	return (
		<>
			<h2>
				<Link href={url}>
					<a>{title}</a>
				</Link>
			</h2>
			<h4>
				<span className='post-date'>{fmtDate}</span>
			</h4>
			<article
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></article>
		</>
	);
}
