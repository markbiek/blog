export interface Post {
	title: string;
	date: string;
	author: 'mark';
	category: string;
	tags: string;
	slug: string;
	html: string;
	url: string;
}

export type PostTitle = Pick<Post, 'title' | 'date' | 'url'>;
