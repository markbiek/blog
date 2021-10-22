import styles from '../styles/Post.module.css';

import { getPostBySlug, getPostTitles } from '../lib/api';
import PostTitles from '../components/PostTitles';
import Post from '../components/Post';
import Header from '../components/Header';

import { PostTitleType, PostViewProps } from '../types';

export default function PostView({ post, titles }: PostViewProps) {
	return (
		<>
			<main>
				<Header />
				<section>
					<Post post={post} />
				</section>
				<PostTitles titles={titles} />
			</main>
		</>
	);
}
