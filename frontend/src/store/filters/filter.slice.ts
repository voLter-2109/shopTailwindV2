import { perPageProduct } from '../../constant/app.constants'
import { EnumProductSort } from '../../types/product.interface'
import { IFilterState, IFiltersActionsPayload } from './filter.interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialFilterState: IFilterState = {
	isFilterUpdated: false,
	queryParams: {
		sort: EnumProductSort.NEWEST,
		searchTerm: '',
		page: 1,
		perPage: perPageProduct,
		ratings: '',
		minPrice: '',
		maxPrice: '',
		categoryId: ''
	}
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState: initialFilterState,
	reducers: {
		updateQueryParam: (
			state,
			action: PayloadAction<IFiltersActionsPayload>
		) => {
			const { key, value } = action.payload

			state.queryParams[key] = value
			state.isFilterUpdated = true
		},
		resetFilterUpdate: state => {
			state.isFilterUpdated = false
		}
	}
})
