import styles from '../styles/Home.module.css';

import { getMostRecentPost, getPostTitles } from '../lib/api';
import PostView from '../views/PostView';

import { PostType, PostTitleType, PostViewProps } from '../types';

export default function Blog({ post, titles }: PostViewProps) {
	return (
		<>
			<PostView post={post} titles={titles} />
		</>
	);
}

export async function getStaticProps() {
	const post: PostType = await getMostRecentPost();
	const titles: PostTitleType[] = await getPostTitles();

	return {
		props: {
			post,
			titles,
		},
	};
}
