'use client'

import { useAdminReviews } from '../../../hooks/admin-hooks/useAdminReviews'
import AdminList from '../../../ui/admin/admin-list/AdminList'
import Heading from '../../../ui/heading/Heading'
import { FC } from 'react'

export const Reviews: FC = () => {
	const { data, isFetched } = useAdminReviews()
	return (
		<>
			<Heading>Reviews</Heading>
			<AdminList isLoading={isFetched} listItems={data} />
		</>
	)
}
