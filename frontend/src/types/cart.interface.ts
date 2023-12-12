import { IProductResponse } from './product.interface'

export interface ICartItem {
	id: number
	product: IProductResponse
	quantity: number
	price: number
}
