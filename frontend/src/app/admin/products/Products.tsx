'use client'

import { perPageProduct } from '../../../constant/app.constants'
import { useAdminProducts } from '../../../hooks/admin-hooks/useAdminProducts'
import AdminList from '../../../ui/admin/admin-list/AdminList'
import Heading from '../../../ui/heading/Heading'
import Pagination from 'explorer/pagination/Pagination'
import { useFilters } from 'explorer/useFilters'
import { FC, useEffect } from 'react'

export const Product: FC = () => {
	const { data, isFetched, mutate, refetch } = useAdminProducts()
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<>
			<Heading>Products</Heading>
			<AdminList
				isLoading={isFetched}
				listItems={data?.data}
				removeHandler={mutate}
			/>
			{data?.length && (
				<Pagination
					changePage={page => updateQueryParams('page', page.toString())}
					//@ts-ignore
					currentPage={queryParams.page}
					numberPages={Math.ceil(
						data.length /
							(queryParams.perPage ? +queryParams.perPage : perPageProduct)
					)}
				/>
			)}
		</>
	)
}
