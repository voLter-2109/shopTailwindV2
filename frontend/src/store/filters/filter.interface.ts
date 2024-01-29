import { TypeProductDataFilters } from '../../types/product.interface'

export interface IFilterState {
	isFilterUpdated: boolean
	queryParams: TypeProductDataFilters
}

export interface IFiltersActionsPayload {
	key: keyof TypeProductDataFilters
	value: string
}

export interface IFilterResetActionPayload {
	key: keyof TypeProductDataFilters
}
