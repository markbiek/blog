import Link from "next/link";
import Image from "next/image";

import { getPage } from "../lib/api";

import Layout from "../views/Layout";

export default function ViewPage() {
	return (
		<Layout>
			<article></article>
		</Layout>
	);
}

/*
export async function getStaticProps({ preview = false }) {
	const page = await getPage("/");

	console.log(page);

	return {
		props: {
			page: page?.pageBy,
		},
	};
}
*/
