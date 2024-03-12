import { getAdminUrl } from '../../config/url.config'
import ProductService from '../../services/product/product.service'
import { IListItem } from '../../ui/admin/admin-list/admin-list.interface'
import { formatDate } from '../../utils/format-data'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFilters } from 'explorer/useFilters'

export const useAdminProducts = () => {
	const { queryParams, resetFilter } = useFilters()

	const { data, isFetched, refetch } = useQuery(
		['get adminProducts', queryParams],
		() => ProductService.getAll(queryParams),
		{
			select: data => {
				const product = data.product.map((product): IListItem => {
					return {
						id: product.id,
						viewUrl: `/product/${product.slug}`,
						editUrl: getAdminUrl(`/products/edit/${product.id}`),
						items: [
							product.name,
							product.category.name,
							formatDate(product.createdAt)
						]
					}
				})

				return {
					data: product,
					length: data.length
				}
			}
		}
	)

	const { mutate } = useMutation(
		['delete product'],
		(id: number) => ProductService.delete(id),
		{
			onSuccess() {
				refetch()
			}
		}
	)

	return {
		mutate,
		data,
		isFetched,
		refetch
	}
}
