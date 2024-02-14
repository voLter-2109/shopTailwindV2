'use client'

import { useProfile } from '../../hooks/useProfile'
import { IProductResponse } from '../../types/product.interface'
import Heading from '../../ui/heading/Heading'
import ProductItem from '../../ui/product-item/ProductItem'
import CustomLoading from '../custom-loading/CustomLoading'
import { FC } from 'react'

const Catalog: FC<{
	products: IProductResponse[]
	isLoading?: boolean
	title?: string
}> = ({ products, isLoading = false, title = 'Page' }) => {
	// console.log(products)
	const { profile } = useProfile()
	// console.log(products)
	if (isLoading) return <CustomLoading />

	return (
		<section>
			{title && <Heading className='mb-3'>{title}</Heading>}
			{products.length ? (
				<>
					<div className='flex gap-10 flex-wrap'>
						{products.map(pr => {
							return <ProductItem key={pr.id} product={pr} profile={profile} />
						})}
					</div>
				</>
			) : (
				<span>Not a products</span>
			)}
		</section>
	)
}

export default Catalog
