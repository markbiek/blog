import Link from "next/link";
import Image from "next/image";

import { getPage } from "../lib/api";

import Article from "../components/Article";
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

	return (
		<Layout>
			<h1>{title}</h1>
			<Article content={content} />
		</Layout>
	);
}

export async function getStaticProps(context: any) {
	console.log(context);
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
