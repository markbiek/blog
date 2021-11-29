import styles from '../styles/Home.module.css';

import { getMostRecentPost, getPostTitles } from '../lib/api';
import generateFeed from '../lib/feed';
import PostView from '../views/PostView';

import { PostType, PostTitleType, PostViewProps } from '../types';

import Layout from '../views/Layout';

export default function Blog({ post, titles }: PostViewProps) {
	return (
		<Layout>
			<PostView post={post} titles={titles} />
		</Layout>
	);
}

export async function getStaticProps() {
	await generateFeed();
	const post: PostType = await getMostRecentPost();
	const titles: PostTitleType[] = await getPostTitles();

	return {
		props: {
			post,
			titles,
		},
	};
}
