import styles from '../styles/Home.module.css';

import { getMostRecentPost, getPostTitles } from '../lib/api';
import PostTitles from '../components/PostTitles';
import Post from '../components/Post';
import Header from '../components/Header';

import { PostType, PostTitleType } from '../types';

interface HomeProps {
	post: PostType;
	titles: PostTitleType[];
}

export default function Home({ post, titles }: HomeProps) {
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
