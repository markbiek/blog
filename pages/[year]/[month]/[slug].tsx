import { getPostBySlug, getPostTitles, getPosts } from "../../../lib/api";
import PostView from "../../../views/PostView";
import Layout from "../../../views/Layout";

import { PostType, PostTitleType, PostViewProps } from "../../../types";

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
		<Layout>
			<PostView post={post} titles={titles} />
		</Layout>
	);
}

export async function getStaticProps({ params }: StaticProps) {
	const post: PostType | null = await getPostBySlug(params.slug);
	const titles: PostTitleType[] = await getPostTitles();

	return {
		props: { post, titles },
	};
}

export async function getStaticPaths() {
	const posts: PostType[] = await getPosts();

	const ret = {
		paths: posts.map((post) => {
			const { slug } = post;
			const fields = post.date.match(/(\d{4})-(\d{1,2})/);

			const year = fields ? fields[1] : "";
			const month = fields ? fields[2] : "";

			return {
				params: {
					year,
					month,
					slug,
				},
			};
		}),
		fallback: "blocking",
	};

	return ret;
}
