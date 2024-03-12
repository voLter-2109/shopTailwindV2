'use client'

import { useProfile } from '../../../hooks/useProfile'
import ProductService from '../../../services/product/product.service'
import { IProductResponse } from '../../../types/product.interface'
import Heading from '../../../ui/heading/Heading'
import ProductGallery from './ProductGallery'
import ProductReviewsCount from './ProductReviewsCount'
import SimilarProduct from './SimilarProduct'
import ProductInformation from './product-information/ProductInformation'
import ProductReviews from './product-reviews/ProductReviews'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

interface IProductPage {
	initialProduct: IProductResponse
	similarProduct: IProductResponse[]
	slug?: string
}

const Product: FC<IProductPage> = ({
	initialProduct,
	similarProduct,
	slug = ''
}) => {
	const { profile } = useProfile()

	const { data: product } = useQuery(
		[`get product ${slug}, ${initialProduct.id}`],
		() => ProductService.getBySlug(slug),
		{
			enabled: !!slug,
			initialData: initialProduct
		}
	)

	return (
		<>
			<Heading className='mb-1'>{product.name}</Heading>
			<ProductReviewsCount product={product} />
			<div className='grid gap-12 mt-6 grid-cols-3'>
				<ProductGallery image={product.image} />
				<div className='opacity-80 font-light'>
					<div className='font-semibold mb-1'>Descriptions:</div>
					{product.description}
				</div>
				<ProductInformation product={product} profile={profile} />
			</div>
			<SimilarProduct profile={profile} similarProduct={similarProduct} />
			{/* <LeaveReview  /> */}
			<ProductReviews productId={product.id} reviews={product.reviews} />
		</>
	)
}

export default Product
