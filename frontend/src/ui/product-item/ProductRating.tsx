import { IProductResponse } from '../../types/product.interface'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

interface IProductRating {
	product: IProductResponse
	isText?: boolean
}

const ProductRating: FC<IProductRating> = ({ product, isText = false }) => {
	return (
		<div className='mb-2'>
			<div className='flex flex-row items-end'>
				<Rating
					readonly
					initialValue={product.averageReviews}
					SVGstyle={{
						display: 'inline-block'
					}}
					size={22}
					allowFraction
					transition
				/>
				<span className='font-semibold text-xs'>{product.averageReviews}</span>
			</div>
			{isText && (
				<span className=''>Кол-во отзывов: {product.reviews.length}</span>
			)}
		</div>
	)
}

export default ProductRating
