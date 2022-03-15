import Link from "next/link";
import Image from "next/image";

import { getPage } from "../lib/api";

import Layout from "../views/Layout";
import { Page } from "../types";

interface ViewPageProps {
	page?: Page;
}

export default function ViewPage({ page }: ViewPageProps) {
	if (!page) {
		// TODO - 404
		return null;
	}

	const {
		date,
		title,
		content,
		featuredImage: {
			node: { sourceUrl, altText },
		},
	} = page;

	return (
		<Layout>
			<article></article>
		</Layout>
	);
}

export async function getStaticProps(context: any) {
	const page = await getPage(`/${context.params.page}`);

	console.log(page);

	return {
		props: {
			page: page?.pageBy,
		},
	};
}

export async function getStaticPaths() {
	const ret = {
		paths: [],
		fallback: "blocking",
	};

	return ret;
}
