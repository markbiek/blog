//import Link from "next/link";
//import Image from "next/image";

import Layout from "../views/Layout";

import { CmsPageType } from "../types";
import { getWordPressPostBySlug } from "../lib/api";

interface AboutProps {
	post: CmsPageType;
}

export default function About({post}: AboutProps ) {
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
	const post = await getWordPressPostBySlug("about");

	return {
		props: { post },
		revalidate: 300,
	};
}