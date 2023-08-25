import CmsPage from "../components/CmsPage";

import { CmsPageProps } from "../types";
import { getWordPressPostBySlug } from "../lib/api";

export default function About({post}: CmsPageProps ) {
	return <CmsPage post={post} />;
}

export async function getStaticProps() {
	const post = await getWordPressPostBySlug("about");

	return {
		props: { post },
		revalidate: 300,
	};
}