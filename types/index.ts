export interface CmsPageType {
	title: string;
	content: string;
}

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

export interface WordPressPost {
	title: string;
	content: string;
}

export type PostTitleType = Pick<PostType, "title" | "date" | "url">;

export interface PostViewProps {
	post: PostType;
	titles: PostTitleType[];
}
