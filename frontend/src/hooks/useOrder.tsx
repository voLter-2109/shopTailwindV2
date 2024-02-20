import { useQuery } from '@tanstack/react-query'
import OrderService from '../services/order.service'
import { IOrderResponse } from '../types/order.intervace'

export const useOrder = () => {
	const { data } = useQuery(['get order'], () => OrderService.getByUserId(), {
		select: ({ data }) => data
	})

	return { orders: data || ([] as IOrderResponse[]) }
}
