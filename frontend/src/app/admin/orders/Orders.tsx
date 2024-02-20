'use client'

import { FC } from 'react'
import { useAdminOrders } from '../../../hooks/admin-hooks/useAdminOrders'
import AdminList from '../../../ui/admin/admin-list/AdminList'
import Heading from '../../../ui/heading/Heading'

export const Orders: FC = () => {
	const { data, isFetched } = useAdminOrders()
	return (
		<>
			<Heading>Orders</Heading>
			<AdminList
				isLoading={isFetched}
				listItems={data}
			/>
	
		</>
	)
}
