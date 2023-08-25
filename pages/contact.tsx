import Layout from "../views/Layout";

import { CmsPageType } from "../types";
import { getWordPressPostBySlug } from "../lib/api";

interface ContactProps {
	post: CmsPageType;
}

export default function Contact({post}: ContactProps) {
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
	const post = await getWordPressPostBySlug("contact");

	return {
		props: { post },
		revalidate: 300,
	};
}
