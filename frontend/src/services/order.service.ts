import instanse from '../api/api.interceptor'
import { IOrderResponse, TypeDataPlaceOrder } from '../types/order.intervace'

const ORDER = '/orders'

const OrderService = {
	async getAll() {
		return instanse<IOrderResponse[]>({
			method: 'GET',
			url: ORDER
		})
	},

	async getByUserId() {
		return instanse<IOrderResponse[]>({
			method: 'GET',
			url: `${ORDER}/by-user`
		})
	},

	async placeOrder(data: TypeDataPlaceOrder) {
		return instanse<{ confirmation: { confirmation_url: string } }>({
			url: ORDER,
			method: 'POST',
			data: data
		})
	}
}

export default OrderService
