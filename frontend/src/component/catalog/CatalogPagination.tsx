'use client'

import { perPageProduct } from '../../constant/app.constants'
import { useProfile } from '../../hooks/useProfile'
import ProductService from '../../services/product/product.service'
import { IProductResponse } from '../../types/product.interface'
import Heading from '../../ui/heading/Heading'
import Loader from '../../ui/loader/Loader'
import ProductItem from '../../ui/product-item/ProductItem'
import { useQuery } from '@tanstack/react-query'
import Pagination from 'explorer/pagination/Pagination'
import { useFilters } from 'explorer/useFilters'
import { FC } from 'react'

const CatalogPagination: FC<{
	title?: string
}> = ({ title }) => {
	const { profile } = useProfile()

	// const CatalogPagination: FC<{
	// 	data: IProductPagination
	// 	title?: string
	// }> = ({ data, title }) => {
	// 	const { profile } = useProfile()
	// console.log(data)
	// const [page, setPage] = useState(0)

	// const {
	// 	data: response,
	// 	isLoading,
	// 	refetch
	// } = useQuery(
	// 	['product', perPageProduct],
	// 	async () =>
	// 		await ProductService.getAll({
	// 			page: page + 1,
	// 			perPage: perPageProduct,
	// 			sort: EnumProductSort.NEWEST
	// 		}),
	// 	{ initialData: data }
	// )

	// useEffect(() => {
	// 	refetch()
	// }, [page])

	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { data, isFetching, refetch } = useQuery(
		['GET All product', queryParams],
		() =>{
			return ProductService.getAll(queryParams)
		} ,
		{
			enabled: isFilterUpdated
		}
	)

	// if (isLoading) return <Loader />
	if (isFetching) return <Loader />

	// return (
	// 	<section>
	// 		<div className='flex ' style={{ justifyContent: 'space-between' }}>
	// 			{title && <Heading className='mb-3'>{title}</Heading>}
	// 		</div>
	// 		{response.product?.length ? (
	// 			<>
	// 				<div className='flex gap-2 justify-between mb-12 flex-wrap '>
	// 					{response.product?.map((pr: IProductResponse) => {
	// 						// console.log(pr.id)
	// 						return <ProductItem key={pr.id} product={pr} profile={profile} />
	// 					})}
	// 				</div>
	// 				<div className=' w-full flex'>
	// 					<ReactPaginate
	// 						className='flex mx-auto'
	// 						pageClassName='mx-2'
	// 						activeClassName='text-primary  pointer-events-none opacity-80 w-5 text-center font-extrabold'
	// 						nextLabel='next >'
	// 						onClick={e => {
	// 							//@ts-ignore
	// 							setPage(+e.nextSelectedPage)
	// 						}}
	// 						forcePage={page}
	// 						pageCount={Math.ceil(response.length / perPageProduct)}
	// 						previousLabel='< prev'
	// 						renderOnZeroPageCount={null}
	// 					/>
	// 				</div>
	// 			</>
	// 		) : (
	// 			<span>Not a products</span>
	// 		)}
	// 	</section>
	// )

	return (
		<section>
			<div className='flex ' style={{ justifyContent: 'space-between' }}>
				{title && <Heading className='mb-3'>{title}</Heading>}
			</div>
			{data?.product?.length ? (
				<>
					<div className='flex gap-2 justify-between mb-12 flex-wrap '>
						{data?.product?.map((pr: IProductResponse) => {
							// console.log(pr.id)
							return <ProductItem key={pr.id} product={pr} profile={profile} />
						})}
					</div>
					<div className=' w-full flex'>
						<Pagination
							changePage={page => updateQueryParams('page', page.toString())}
							//@ts-ignore
							currentPage={queryParams.page}
							numberPages={Math.ceil(
								data.length /
									(queryParams.perPage ? +queryParams.perPage : perPageProduct)
							)}
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
