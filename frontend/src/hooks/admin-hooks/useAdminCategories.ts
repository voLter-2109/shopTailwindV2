import { useMutation, useQuery } from '@tanstack/react-query'
import { getAdminUrl } from '../../config/url.config'
import CategoryService from '../../services/category.service'
import { IListItem } from '../../ui/admin/admin-list/admin-list.interface'

export const useAdminCategories = () => {

	const { data, isFetched, refetch } = useQuery(
		['get admin categories'],
		() => CategoryService.getAll(),
		{
			select: ({data}) => {
			return	data.map((category): IListItem => {
					return {
						id: category.id,
						viewUrl: getAdminUrl(`/category/${category.slug}`),
						editUrl: getAdminUrl(`/category/edit/${category.id}`),
						items: [
							category.name,
							category.slug
						]
					}
				})

			}
		}
	)

	const { mutate } = useMutation(
		['delete category'],
		(id: number) => CategoryService.delete(id),
		{
			onSuccess() {
				refetch()
			}
		}
	)

	return {
		mutate,
		data,
		isFetched
	}
}
