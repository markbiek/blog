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

	const { title, content } = page;

	const articleMarkup = { __html: content };

	return (
		<Layout>
			<h1>{title}</h1>
			<article dangerouslySetInnerHTML={articleMarkup} />
		</Layout>
	);
}

export async function getStaticProps(context: any) {
	const page = await getPage(`/${context.params.page}`);

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
