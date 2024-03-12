import { getAdminUrl } from '../../config/url.config'
import OrderService from '../../services/order.service'
import { IListItem } from '../../ui/admin/admin-list/admin-list.interface'
import { convertPrice } from '../../utils/convertPrice'
import { formatDate } from '../../utils/format-data'
import { useQuery } from '@tanstack/react-query'

export const useAdminOrders = () => {
	const { data, isFetched, refetch } = useQuery(
		['get admin orders'],
		() => OrderService.getAll(),
		{
			select: ({ data }) => {
				return data.map((order): IListItem => {
					return {
						id: order.id,
						editUrl: getAdminUrl(`/order/edit/${order.id}`),
						items: [
							`#${order.id}`,
							order.status,
							formatDate(order.createdAt),
							convertPrice(order.total)
						]
					}
				})
			}
		}
	)

	return {
		data,
		isFetched
	}
}
