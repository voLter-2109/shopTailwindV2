import { useAuth } from '../../../../hooks/useAuth'
import { IReviewResponse } from '../../../../types/review.interface'
import Heading from '../../../../ui/heading/Heading'
import Modal from '../../../../ui/modal/Modal'
import LeaveReview from './LeaveReview'
import ReviewsItem from './ReviewsItem'
import { FC, useState } from 'react'

interface IProductReviews {
	reviews: IReviewResponse[]
	productId: number
}

const ProductReviews: FC<IProductReviews> = ({ productId, reviews }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { user } = useAuth()

	if (!reviews) return null

	return (
		<section id='reviews' className='mt-20'>
			<div className='mb-9'>
				<Heading className='mb-3'>Reviews:</Heading>
				{user && (
					<button className='text-primary' onClick={() => setIsModalOpen(true)}>
						Leave a review
					</button>
				)}
			</div>

			{user && (
				<Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)}>
					<LeaveReview productId={productId} />
				</Modal>
			)}
			<div className='grid grid-cols-4 gap-10'>
				{reviews.map(review => (
					<ReviewsItem key={review.id} review={review} />
				))}
			</div>
		</section>
	)
}

export default ProductReviews
