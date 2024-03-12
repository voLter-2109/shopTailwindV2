import { FC } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-scroll'
import { IProductResponse } from '../../../types/product.interface'
import ProductRating from '../../../ui/product-item/ProductRating'

interface IProductReviews {
	product: IProductResponse
}

const ProductReviewsCount: FC<IProductReviews> = ({ product }) => {
	const reviewsLength = product.reviews.length

	if (!reviewsLength) return null
	return (
		<div>
			<ProductRating product={product} />
			<div>
				<Link
					className='opacity-50 font-semibold text-sm cursor-pointer'
					to='reviews'
					smooth={true}
					offset={-50}
					duration={1000}
				>
					{reviewsLength} Reviews <FiChevronRight className='inline' />
				</Link>
			</div>
		</div>
	)
}

export default ProductReviewsCount
