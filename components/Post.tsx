import Link from 'next/link';
import * as dayjs from 'dayjs';

import { PostType } from '../types';

interface PostProps {
	post: PostType;
}
export default function Post({ post }: PostProps) {
	const { title, date, url, html } = post;

	return (
		<>
			<h2>
				<Link href={url}>
					<a>{title}</a>
				</Link>
			</h2>
			<h4>
				<span className='post-date'>{dayjs(date).format('YYYY-MM')}</span>
			</h4>
			<article
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			></article>
		</>
	);
}
