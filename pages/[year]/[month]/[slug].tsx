import styles from '../styles/Post.module.css';

import { getPostBySlug, getPostTitles, getPosts } from '../../../lib/api';
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
	const posts: PostType[] = await getPosts();

	return {
		paths: posts.map((post) => {
			const { slug } = post;
			const fields = post.date.match(/(\d{4})-(\d{2})/);

			return {
				params: {
					year: fields ? fields[1] : '',
					month: fields ? fields[2] : '',
					slug,
				},
			};
		}),
		fallback: 'blocking',
	};
}
