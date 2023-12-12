'use client'

import { useQuery } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { useProfile } from '../../hooks/useProfile'
import ProductService from '../../services/product/product.service'
import {
	EnumProductSort,
	IProductPagination,
	IProductResponse,
	perPageProduct
} from '../../types/product.interface'
import Heading from '../../ui/heading/Heading'
import Loader from '../../ui/loader/Loader'
import ProductItem from '../../ui/product-item/ProductItem'
import SortDropDown from '../../ui/sort-drop-down/SortDropDown'

const CatalogPagination: FC<{
	data: IProductPagination
	title?: string
}> = ({ data, title }) => {
	const { profile } = useProfile()
	// console.log(data)
	const [page, setPage] = useState(1)

	const [sortType, setSortType] = useState<EnumProductSort>(
		EnumProductSort.HIGH_PRICE
	)

	const {
		data: response,
		isLoading,
		refetch
	} = useQuery(
		['product', sortType, perPageProduct],
		async () =>
			await ProductService.getAll({
				page,
				perPage: perPageProduct,
				sort: sortType
			}),
		{ initialData: data }
	)

	useEffect(() => {
		refetch()
		// console.log(response.product.length)
	}, [page, sortType])

	// useEffect(() => {
	// 	console.log(response.length)
	// }, [response])

	if (isLoading) return <Loader />

	return (
		<section>
			<div className='flex ' style={{ justifyContent: 'space-between' }}>
				{title && <Heading className='mb-3'>{title}</Heading>}
				{
					<SortDropDown
						sortType={sortType}
						setSortType={setSortType}
						setPage={setPage}
					/>
				}
			</div>
			{response.product?.length ? (
				<>
					<div className='flex gap-10 flex-wrap' style={{ gap: '10px' }}>
						{response.product?.map((pr: IProductResponse) => {
							// console.log(pr.id)
							return <ProductItem key={pr.id} product={pr} profile={profile} />
						})}
					</div>
					<div className=' w-full flex'>
						<ReactPaginate
							className='flex mx-auto'
							pageClassName='mx-2'
							activeClassName='border-x-2 border-primary w-5 text-center'
							nextLabel='next >'
							onClick={e => {
								if (e.nextSelectedPage) setPage(+e.nextSelectedPage + 1)
							}}
							pageCount={Math.ceil(response.length / perPageProduct)}
							previousLabel='< previous'
							renderOnZeroPageCount={null}
						/>
					</div>
				</>
			) : (
				<span>Not a products</span>
			)}
		</section>
	)
}

export default CatalogPagination
