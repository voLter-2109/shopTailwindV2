import { NO_INDEX_PAGE } from '../../constant/app.constants'
import Thanks from './Thanks'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<Thanks />
		</div>
	)
}
