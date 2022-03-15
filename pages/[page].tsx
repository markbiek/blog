import Link from "next/link";
import Image from "next/image";

import { getPage } from "../lib/api";

import Layout from "../views/Layout";
import { Page } from "../types";

import styles from "../styles/Home.module.css";

interface ViewPageProps {
	page?: Page;
}

export default function ViewPage({ page }: ViewPageProps) {
	if (!page) {
		// TODO - 404
		return null;
	}
	console.log(page);

	const { title, content, isFrontPage } = page;

	const articleMarkup = { __html: content };

	if (isFrontPage) {
		const {
			featuredImage: {
				node: { sourceUrl, altText },
			},
		} = page;

		return (
			<Layout>
				<section className={styles.whoami}>
					<article className={styles.hero}>
						<Image src={sourceUrl} alt={altText} width={400} height={400} />
					</article>
					<article
						className={styles.article}
						dangerouslySetInnerHTML={articleMarkup}
					/>
				</section>
			</Layout>
		);
	}

	return (
		<Layout>
			<h1>{title}</h1>
			<article dangerouslySetInnerHTML={articleMarkup} />
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
