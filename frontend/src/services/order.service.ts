import instanse from '../api/api.interceptor'
import { IOrderResponse } from '../types/order.intervace'

const ORDER = '/orders'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}
type TypeData = {
	status?: EnumOrderStatus
	items: {
		quantity: number
		productId: number
		price: number
	}[]
}

const OrderService = {
	async getAll() {
		return instanse<IOrderResponse[]>({
			method: 'GET',
			url: `${ORDER}/by-user`
		})
	},

	async placeOrder(data: TypeData) {
		return instanse<{ confirmation: { confirmation_url: string } }>({
			url: ORDER,
			method: 'POST',
			data: data
		})
	}
}

export default OrderService
