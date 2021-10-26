import fs from 'fs';
import { join } from 'path';

import markdownToHtml from './markdownToHtml';

import { PostType, PostTitleType } from '../types';

interface PostDetails {
	meta: string[];
	postContent: string;
}

const postsDir = join(process.cwd(), '_posts');

function postFiles(direction: 'asc' | 'desc'): string[] {
	const files: string[] = fs.readdirSync(postsDir);

	if (direction === 'desc') {
		files.reverse();
	} else {
		files.sort();
	}

	return files;
}

function emptyPost(): PostType {
	return {
		title: '',
		date: '',
		author: 'mark',
		category: '',
		tags: '',
		slug: '',
		html: '',
		url: '',
	};
}

function postDetails(postFile: string): PostDetails {
	const contents = fs.readFileSync(`_posts/${postFile}`, 'utf8');

	const lines = contents.split('\n');
	const meta = lines.slice(0, 6);
	const postContent = lines.slice(6).join('\n');

	return {
		meta,
		postContent,
	};
}

function getPostMeta(metaStrings: string[]) {
	const ret = emptyPost();

	for (const m of metaStrings) {
		const fields = m.match(/^(\w+):\s*(.*?)$/);
		if (!fields) {
			continue;
		}

		const field = fields[1].toLowerCase();

		switch (field) {
			case 'title':
				ret.title = fields[2];
				break;
			case 'date':
				ret.date = fields[2];
				break;
			case 'category':
				ret.category = fields[2];
				break;
			case 'tags':
				ret.tags = fields[2];
				break;
			case 'slug':
				ret.slug = fields[2];
				break;
		}
	}

	return ret;
}

function setPostMeta(post: PostType, metaStrings: string[]): void {
	const meta = getPostMeta(metaStrings);
	const html = post.html;

	Object.assign(post, meta);
	post.html = html;

	const fields = post.date.match(/(\d{4})-(\d{2})/);
	post.url = fields ? `${fields[1]}/${fields[2]}/${post.slug}` : '';
}

async function postFromFile(postFile: string, convertNewlines = false) {
	const { meta, postContent } = postDetails(postFile);
	const post = emptyPost();

	post.html = await markdownToHtml(postContent);
	if (convertNewlines) {
		post.html = post.html.replace(/\n/g, '<br />');
	}

	setPostMeta(post, meta);

	return post;
}

export async function getPostBySlug(slug: string) {
	const files = postFiles('asc');

	for (const file of files) {
		const post = await postFromFile(file);

		if (post.slug == slug) {
			return post;
		}
	}

	return null;
}

export async function getPostTitles() {
	const titles: PostTitleType[] = [];
	const files = postFiles('desc');

	for (const file of files) {
		const post = await postFromFile(file);
		const { title, date, url } = post;

		titles.push({ title, date, url });
	}

	return titles;
}

export async function getPosts() {
	const posts: PostType[] = [];
	const files = postFiles('asc');

	for (const file of files) {
		const post = await postFromFile(file);

		posts.push(post);
	}

	return posts;
}

export async function getMostRecentPost() {
	const files = postFiles('desc');
	const postFile = files[files.length - 1];
	const post = await postFromFile(postFile);

	return post;
}
