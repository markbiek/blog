import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import * as dayjs from 'dayjs';

import styles from '../styles/Home.module.css';

import { getMostRecentPost, getPostTitles } from '../lib/api';

import { Post, PostTitle } from '../types';

interface HomeProps {
	post: Post;
	titles: PostTitle[];
}

export default function Home({ post, titles }: HomeProps) {
	const { title, date, url, html } = post;

	return (
		<main>
			<h1>Blog</h1>
			<section>
				<h2>
					<Link href={url}>
						<a>{title}</a>
					</Link>
				</h2>
				<h4>
					<span className='post-date'>{date}</span>
				</h4>
				<article
					dangerouslySetInnerHTML={{
						__html: html,
					}}
				></article>
			</section>
			{titles.length > 0 && (
				<ul>
					{titles.map((item: PostTitle, idx: number) => {
						const { title, date, url } = item;

						return (
							<li key={`title_${idx}`}>
								<Link href={url}>
									<a>
										{dayjs(date).format('YYYY MMM-DD')} &ndash; {title}
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</main>
	);
}

export async function getStaticProps() {
	const post: Post = await getMostRecentPost();
	const titles: PostTitle[] = await getPostTitles();

	return {
		props: {
			post,
			titles,
		},
	};
}
