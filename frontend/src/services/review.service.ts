import instanse from '../api/api.interceptor'
import { IReviewData, IReviewResponse } from '../types/review.interface'

const REVIEW = '/reviews'

const ReviewService = {
	async getAll() {
		return instanse<IReviewResponse[]>({
			method: 'GET',
			url: REVIEW
		})
	},

	//average-by-product
	async getAvarageByProduct(productId: string | number) {
		return instanse<number>({
			method: 'GET',
			url: `${REVIEW}/average-by-product/${productId}`
		})
	},

	async leave(productId: string | number, data: IReviewData) {
		return instanse<IReviewResponse>({
			method: 'POST',
			url: `${REVIEW}/leave/${productId}`,
			data: data
		})
	}
}

export default ReviewService
