'use client'

import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { initialFilterState } from '../../store/filters/filter.slice'
import { TypeProductDataFilters } from '../../types/product.interface'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useFilters = () => {
	const pathName = usePathname()
	const searchParams = useSearchParams()
	const { updateQueryParam } = useActions()
	const { replace } = useRouter()

	const { queryParams, isFilterUpdated } = useTypedSelector(
		state => state.filter
	)

	useEffect(() => {
		// console.log("useFilter")
		let key: keyof TypeProductDataFilters
		for (key in initialFilterState.queryParams) {
			let value = searchParams.get(key)
			if (!!value) {
				updateQueryParam({ key: key as keyof TypeProductDataFilters, value })
			} else {
				const queryValue = initialFilterState.queryParams[key]?.toString()
				updateQueryParam({
					key: key as keyof TypeProductDataFilters,
					//@ts-ignore
					value: queryValue
				})
			}
		}

		// searchParams.forEach((value, key) => {
		// 	updateQueryParam({ key: key as keyof TypeProductDataFilters, value })
		// })


	}, [])

	const updateQueryParams = (
		key: keyof TypeProductDataFilters,
		value: string
	) => {
		const newParams = new URLSearchParams(searchParams.toString())

		if (value) {
			newParams.set(key, value)
		} else {
			newParams.delete(key)
		}

		replace(pathName + `?${newParams.toString()}`)

		updateQueryParam({ key, value })
	}

	return {
		updateQueryParams,
		queryParams,
		isFilterUpdated
	}
}
