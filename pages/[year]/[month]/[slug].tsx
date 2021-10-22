import styles from '../styles/Post.module.css';

import { getPostBySlug, getPostTitles } from '../../../lib/api';
import PostView from '../../../views/PostView';

import { PostType, PostTitleType, PostViewProps } from '../../../types';

interface Params {
	year: number;
	month: number;
	slug: string;
}

interface StaticProps {
	params: Params;
}

export default function ViewPost({ post, titles }: PostViewProps) {
	return (
		<>
			<PostView post={post} titles={titles} />
		</>
	);
}

export async function getStaticProps({ params }: StaticProps) {
	const post: PostType | null = await getPostBySlug(params.slug);
	const titles: PostTitleType[] = await getPostTitles();

	return {
		props: { post, titles },
		revalidate: 30,
	};
}

export async function getStaticPaths() {
	return {
		paths: [],
		fallback: 'blocking',
	};
}
