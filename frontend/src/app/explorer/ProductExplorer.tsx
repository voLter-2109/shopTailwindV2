'use client'

import Catalog from '../../component/catalog/Catalog'
import { perPageProduct } from '../../constant/app.constants'
import ProductService from '../../services/product/product.service'
import Button from '../../ui/button/Button'
import Heading from '../../ui/heading/Heading'
import styles from './ProductExplorer.module.scss'
import Pagination from './pagination/Pagination'
import SortDropDown from './sort/SortDropDown'
import { useFilters } from './useFilters'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { FC, useState } from 'react'

const ProductExplorer: FC = () => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)
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
				<Heading>
					{queryParams.searchTerm
						? `Search by query ${queryParams.searchTerm}`
						: 'Explorer'}
				</Heading>
				<SortDropDown />
			</div>
			<Button
				variantColor='light'
				onClick={() => setIsFilterOpen(!isFilterOpen)}
				className='mb-7'
			>
				{isFilterOpen ? 'Close' : 'Open'}
			</Button>

			<div className={cn(styles.explorer, isFilterOpen && styles.filterOpened)}>
				<aside>"filter"</aside>
				<section>
					{data?.product && (
						<>
							<Catalog products={data.product} isLoading={isFetching} />
							<Pagination
								changePage={page => updateQueryParams('page', page.toString())}
								//@ts-ignore
								currentPage={queryParams.page}
								numberPages={Math.ceil(
									data.length /
										(queryParams.perPage
											? +queryParams.perPage
											: perPageProduct)
								)}
							/>
						</>
					)}
				</section>
			</div>
		</>
	)
}

export default ProductExplorer
