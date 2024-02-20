import { useQuery } from '@tanstack/react-query'
import ReviewService from '../../services/review.service'
import { IListItem } from '../../ui/admin/admin-list/admin-list.interface'

export const useAdminReviews = () => {

	const { data, isFetched } = useQuery(
		['get admin reviews'],
		() => ReviewService.getAll(),
		{
			select: ({data}) => {
			return	data.map((review): IListItem => ({
					id: review.id,
					items: [
						Array.from({length: review.rating})
						.map(() => "⭐")
						.join(""),
						review.user.name,
						review.text
					]					
				}))

			}
		}
	)

	return {
		data,
		isFetched
	}
}
