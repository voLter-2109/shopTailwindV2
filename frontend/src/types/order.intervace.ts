import { ICartItem } from './cart.interface'
import { IUserResponse } from './user.interface'

export enum EnumOrderStatus {
	PENDING = 'PENDING',
	PAYED = 'PAYED',
	SHIPPED = 'SHIPPED',
	DELIVERED = 'DELIVERED'
}

export interface IOrderResponse {
	id: number
	createdAt: string
	updatedAt: string
	items: ICartItem[]
	userId: number
	status: EnumOrderStatus
	total: number
}
