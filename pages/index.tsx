import Image from "next/image";

import { getPage } from "../lib/api";

import Layout from "../views/Layout";

import styles from "../styles/Home.module.css";

interface FeaturedImageNode {
	sourceUrl: string;
	srcSet: string;
	altText: string;
}

interface FeaturedImage {
	node: FeaturedImageNode;
}

interface Page {
	id: string;
	date: string;
	title: string;
	isFrontPage: boolean;
	content: string;
	featuredImage: FeaturedImage;
}

interface HomeProps {
	page?: FeaturedImage;
}

export default function Home({ page }: HomeProps) {
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

	const articleMarkup = { __html: content };

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

export async function getStaticProps({ preview = false }) {
	const page = await getPage("/");

	console.log(page);

	return {
		props: {
			page: page?.pageBy,
		},
	};
}
