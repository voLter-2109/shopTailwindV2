'use client'

import { perPageProduct } from '../../constant/app.constants'
import ProductService from '../../services/product/product.service'
import Heading from '../../ui/heading/Heading'
import Catalog from './Catalog'
import { useQuery } from '@tanstack/react-query'
import Pagination from 'explorer/pagination/Pagination'
import SortDropDown from 'explorer/sort/SortDropDown'
import { useFilters } from 'explorer/useFilters'
import { FC } from 'react'

const CatalogPagination: FC<{
	title?: string
}> = ({ title }) => {
	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { data, isFetching, refetch } = useQuery(
		['product explorer', queryParams],
		() => ProductService.getAll(queryParams),
		{
			enabled: isFilterUpdated
		}
	)

	return (
		<>
			<div className='flex items-center justify-between mb-7'>
				<Heading>{title}</Heading>
				<SortDropDown />
			</div>

			<div className='flex gap-2 justify-between mb-12 flex-wrap '>
				{data?.product && (
					<>
						<Catalog products={data.product} isLoading={isFetching} />
						<Pagination
							changePage={page => updateQueryParams('page', page.toString())}
							//@ts-ignore
							currentPage={queryParams.page}
							numberPages={Math.ceil(
								data.length /
									(queryParams.perPage ? +queryParams.perPage : perPageProduct)
							)}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default CatalogPagination
