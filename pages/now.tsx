import Layout from "../views/Layout";

import { CmsPageType } from "../types";

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
	const url = "https://mark.biek.dev/wp-json/wp/v2/pages?slug=now";
	const res = await fetch(url);
	const posts = await res.json();

	const post = {
		title: posts[0].title.rendered,
		content: posts[0].content.rendered,
	};

	return {
		props: { post },
		revalidate: 300,
	};
}
