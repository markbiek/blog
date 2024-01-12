// generate-markdown.js

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const promptQuestion = (question) => {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
	});
};

const generateSlug = (title) => {
	title = title.toLowerCase().replace(/[^a-z0-9 ]/g, "");
	return title.toLowerCase().replace(/\s+/g, "-");
};

(async () => {
	const title = await promptQuestion("Title: ");
	const category = await promptQuestion("Category: ");
	const tags = await promptQuestion("Tags (comma separated): ");

	const date = new Date();
	const formattedDate = `${date.getFullYear()}-${String(
		date.getMonth() + 1
	).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	const slug = generateSlug(title);
	const filename = `_posts/${formattedDate}-${slug}.md`;

	const content = `Title: ${title}
Date: ${date.toISOString()}
Author: mark
Category: ${category}
Tags: ${tags}
Slug: ${slug}`;

	fs.writeFileSync(filename, content);
	console.log(`Markdown file created: ${filename}`);
	rl.close();
})();
