import { IProductResponse } from '../../types/product.interface'
import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'

interface IProductRating {
	product: IProductResponse
	isText?: boolean
}

const ProductRating: FC<IProductRating> = ({ product, isText = false }) => {
	const [rating, setRating] = useState<number>(
		product.reviews.reduce((acc, review) => acc + review.rating, 0) / 2 || 0
	)

	return (
		<div className='mb-2'>
			<div className='flex flex-row items-end'>
				<Rating
					readonly
					initialValue={rating}
					SVGstyle={{
						display: 'inline-block'
					}}
					size={22}
					allowFraction
					transition
				/>
				<span className='font-semibold text-xs'>{rating}</span>
			</div>
			{isText && (
				<span className=''>Кол-во отзывов: {product.reviews.length}</span>
			)}
		</div>
	)
}

export default ProductRating
