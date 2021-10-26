import Link from 'next/link';
import dayjs from 'dayjs';

import { PostTitleType } from '../types';

interface PostTitlesProps {
	titles: PostTitleType[];
}

export default function PostTitles({ titles }: PostTitlesProps) {
	return (
		<>
			{titles.length > 0 && (
				<ul className='post-titles'>
					{titles.map((item: PostTitleType, idx: number) => {
						const { title, date, url } = item;

						const fmtDate = dayjs(date).format('YYYY MMM-DD');

						return (
							<li key={`title_${idx}`}>
								<Link href={url}>
									<a>
										{fmtDate} &ndash; {title}
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</>
	);
}
