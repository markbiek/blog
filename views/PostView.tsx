import PostTitles from '../components/PostTitles';
import Post from '../components/Post';

import { PostViewProps } from '../types';

export default function PostView({ post, titles }: PostViewProps) {
	return (
		<>
			<section>
				<Post post={post} />
			</section>
			<PostTitles titles={titles} />
		</>
	);
}
