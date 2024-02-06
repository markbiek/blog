import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

export default async function markdownToHtml(markdown: string) {
	const result = await unified()
		.use(remarkParse)
		.use(remarkRehype, {allowDangerousHtml: true}) // Pass raw HTML strings through.
		.use(rehypeStringify, {allowDangerousHtml: true}) // Serialize the raw HTML strings
		.process(markdown)
		.catch((error) => {
		throw error
		})

	return result.toString();
}
