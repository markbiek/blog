import Image from "next/image";

import { getPage } from "../lib/api";

import Article from "../components/Article";
import Layout from "../views/Layout";
import { Page } from "../types";

import styles from "../styles/Home.module.css";

interface HomeProps {
	page?: Page;
}

export default function Home({ page }: HomeProps) {
	if (!page) {
		// TODO - 404
		return null;
	}

	const {
		content,
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
				<Article className={styles.article} content={content} />
			</section>
		</Layout>
	);
}

export async function getStaticProps() {
	const page = await getPage("/");

	return {
		props: {
			page: page?.pageBy,
		},
	};
}
