import fs from 'fs';
import { join } from 'path';

import markdownToHtml from './markdownToHtml';

import { Post, PostTitle } from '../types';

interface PostDetails {
	meta: string[];
	postContent: string;
}

const postsDir = join(process.cwd(), '_posts');

function hostFiles(): string[] {
	const files: string[] = fs.readdirSync(postsDir);
	files.sort();

	return files;
}

function emptyPost(): Post {
	return {
		title: '',
		date: '',
		author: 'mark',
		category: '',
		tags: '',
		slug: '',
		html: '',
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

function setPostMeta(post: Post, metaStrings: string[]): void {
	const meta = getPostMeta(metaStrings);
	const html = post.html;

	Object.assign(post, meta);
	post.html = html;
}

async function postFromFile(postFile: string) {
	const { meta, postContent } = postDetails(postFile);
	const post = emptyPost();

	post.html = await markdownToHtml(postContent);
	post.html = post.html.replace(/\n/g, '<br />');

	const fields = post.date.match(/(\d{4})-(\d{2})/);
	post.url = fields ? `${fields[1]}/${fields[2]}/${post.slug}` : '';

	setPostMeta(post, meta);

	return post;
}

export async function getPostTitles() {
	const titles: PostTitle[] = [];
	const files = hostFiles();

	for (const file of files) {
		const post = await postFromFile(file);
		const { title, date, url } = post;

		titles.push({ title, date, url });
	}

	return titles;
}

export async function getMostRecentPost() {
	const files = hostFiles();
	const postFile = files[files.length - 1];
	const post = await postFromFile(postFile);

	return post;
}
