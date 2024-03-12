import { IUserResponse } from './user.interface'

export interface IReviewResponse {
	id: number
	user: IUserResponse
	createdAt: string
	text: string
	rating: number
}

export type IReviewData = {
	rating: number
	text: string
}
