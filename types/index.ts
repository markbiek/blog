export interface PostType {
	title: string;
	date: string;
	author: "mark";
	category: string;
	tags: string;
	slug: string;
	html: string;
	url: string;
}

export type PostTitleType = Pick<PostType, "title" | "date" | "url">;

export interface PostViewProps {
	post: PostType;
	titles: PostTitleType[];
}

interface FeaturedImageNode {
	sourceUrl: string;
	srcSet: string;
	altText: string;
}

interface FeaturedImage {
	node: FeaturedImageNode;
}

export interface Page {
	id: string;
	date: string;
	title: string;
	isFrontPage: boolean;
	content: string;
	featuredImage: FeaturedImage;
}
