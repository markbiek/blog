import Layout from "../views/Layout";

import { CmsPageType } from "../types";
import { getWordPressPostBySlug } from "../lib/api";

interface NowProps {
	post: CmsPageType;
}

export default function Now({ post }: NowProps) {
	const { title, content } = post;

	return (
		<Layout>
			<article>
				<h1>{title}</h1>

				<div dangerouslySetInnerHTML={{ __html: content }} />
			</article>
		</Layout>
	);
}

export async function getStaticProps() {
	const post = await getWordPressPostBySlug("now");

	return {
		props: { post },
		revalidate: 300,
	};
}
