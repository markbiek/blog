import CmsPage from "../components/CmsPage";

import { CmsPageProps } from "../types";
import { getWordPressPostBySlug } from "../lib/api";

export default function Now({post}: CmsPageProps ) {
	return <CmsPage post={post} />;
}

export async function getStaticProps() {
	const post = await getWordPressPostBySlug("now");

	return {
		props: { post },
		revalidate: 300,
	};
}