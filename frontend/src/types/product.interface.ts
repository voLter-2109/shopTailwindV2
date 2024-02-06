import { ICategoryResponse } from './category.interface'
import { IReviewResponse } from './review.interface'

export interface IProductResponse {
	id: number
	name: string
	slug: string
	description: string
	price: number
	averageReviews: number
	createdAt: string
	reviews: IReviewResponse[]
	image: string[]
	category: ICategoryResponse
}

//
export interface IProductDetails {
	poduct: IProductResponse
}

export interface IProductPagination {
	product: IProductResponse[]
	length: number
}
export interface ICategoryLenghtResponse {
	length: number
}

export interface IProductData {
	name: string
	price: number
	description?: string
	image: string[]
	categoryID: ICategoryResponse
}

export enum EnumProductSort {
	HIGH_PRICE = 'high-price',
	LOW_PRICE = 'low-price',
	NEWEST = 'newest',
	OLDEST = 'oldest'
}

export type TypeProductDataFilters = {
	sort?: EnumProductSort | string
	searchTerm?: string
	page?: string | number
	perPage?: number | string
	ratings?: string
	minPrice?: string
	maxPrice?: string
	categoryId?: string
}

export type TypeParamsFilter = {
	searchParams: TypeProductDataFilters
}
