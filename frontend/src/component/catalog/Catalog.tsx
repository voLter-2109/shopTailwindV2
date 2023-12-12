'use client'

import { FC } from 'react'
import { useProfile } from '../../hooks/useProfile'
import { IProductResponse } from '../../types/product.interface'
import Heading from '../../ui/heading/Heading'
import Loader from '../../ui/loader/Loader'
import ProductItem from '../../ui/product-item/ProductItem'

const Catalog: FC<{
	products: IProductResponse[]
	isLoading?: boolean
	title?: string
}> = ({ products, isLoading = false, title = 'Favorites roduct' }) => {
	// console.log(products)
	const { profile } = useProfile()
	// console.log(products)
	if (isLoading) return <Loader />

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
