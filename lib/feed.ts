import fs from 'fs';
import { Feed } from 'feed';

import { getPosts } from './api';

const generateFeed = async () => {
	const posts = await getPosts();

	const siteURL = 'https://mark.biek.org/';
	const date = new Date();
	const author = {
		name: 'Mark Biek',
		email: 'info@biek.org',
		link: 'https://mark.biek.org/',
	};

	const feed = new Feed({
		title: 'Mark Biek - Blog',
		description: '',
		id: siteURL,
		link: siteURL,
		image: `https://static.biek.org/blog/img/mark-in-code.png`,
		favicon: `${siteURL}/unicorn.svg`,
		copyright: `All rights reserved ${date.getFullYear()}, Mark Biek`,
		updated: date,
		generator: "Feed for Mark Biek's Blog",
		feedLinks: {
			rss2: `${siteURL}/rss/feed.xml`,
			json: `${siteURL}/rss/feed.json`,
			atom: `${siteURL}/rss/atom.xml`,
		},
		author,
	});

	// Only grab the most recent 5 posts for the RSS feed
	for (let i = 0; i <= 5; i++) {
		const post = posts[i];
		const { title, date, url, html } = post;

		const fullUrl = `${siteURL}/${url}`;

		feed.addItem({
			title,
			id: fullUrl,
			link: fullUrl,
			description: html,
			content: html,
			author: [author],
			contributor: [author],
			date: new Date(date),
		});
	}

	fs.mkdirSync('./public/rss', { recursive: true });
	fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
	fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
	fs.writeFileSync('./public/rss/feed.json', feed.json1());
};

export default generateFeed;
