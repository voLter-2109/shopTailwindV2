import { IOrderResponse } from './order.intervace'
import { IProductResponse } from './product.interface'

export interface IUserResponse {
	id: number
	email: string
	name: string
	avatarPath: string
	phone: string
	isAdmin: boolean
}

export type UserTypeData = {
	email: string
	password?: string
	name?: string
	avatarPath?: string
	phone: string
}

export interface IFullUser extends IUserResponse {
	favorites: IProductResponse[]
	order: IOrderResponse[]
}
