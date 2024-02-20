'use client'

import { FC } from 'react'
import { useAdminCategories } from '../../../hooks/admin-hooks/useAdminCategories'
import AdminList from '../../../ui/admin/admin-list/AdminList'
import Heading from '../../../ui/heading/Heading'

export const Categories: FC = () => {
	const { data, isFetched, mutate } = useAdminCategories()
	return (
		<>
			<Heading>Categories</Heading>
			<AdminList
				isLoading={isFetched}
				listItems={data}
				removeHandler={mutate}
			/>
			
		</>
	)
}
