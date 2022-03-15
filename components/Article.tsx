interface ArticleProps {
	content: string;
	className?: any;
}

export default function Article({ content, className }: ArticleProps) {
	const articleMarkup = { __html: content };
	className = className || {};

	return (
		<article className={className} dangerouslySetInnerHTML={articleMarkup} />
	);
}
