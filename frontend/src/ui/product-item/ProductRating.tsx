import { FC, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { IProductResponse } from '../../types/product.interface'

const ProductRating: FC<{ product: IProductResponse }> = ({ product }) => {
	const [rating, setRating] = useState<number>(
		product.reviews.reduce((acc, review) => acc + review.rating, 0) / 2 || 0
	)

	return (
		<div className='mb-2'>
			<span className=''>
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
				<span
					style={{
						fontSize: '15px',
						color: '#FFBC00'
					}}
				>
					{rating}
				</span>
			</span>
			<span className='ml-2 text-sm'>{product.reviews.length} rev.</span>
		</div>
	)
}

export default ProductRating
