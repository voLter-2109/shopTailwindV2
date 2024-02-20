'use client'

import { FC } from 'react'
import { useAdminReviews } from '../../../hooks/admin-hooks/useAdminReviews'
import AdminList from '../../../ui/admin/admin-list/AdminList'
import Heading from '../../../ui/heading/Heading'

export const Reviews: FC = () => {
	const { data, isFetched } = useAdminReviews()
	return (
		<>
			<Heading>Reviews</Heading>
			<AdminList
				isLoading={isFetched}
				listItems={data}
			/>
			
		</>
	)
}
