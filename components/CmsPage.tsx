import Layout from "../views/Layout";

import { CmsPageProps } from "../types";

export default function CmsPage({post}: CmsPageProps ) {
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