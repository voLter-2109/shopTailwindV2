import CategoryService from '../services/category.service'
import { ICategoryResponse } from '../types/category.interface'
import { useQuery } from '@tanstack/react-query'

export const useCategory = () => {
	const { data, isFetched } = useQuery(
		['getCategory'],
		() => CategoryService.getAll(),
		{
			select: ({ data }) => data
			// enabled: !!user
		}
	)

	// console.log(data)
	return { data: data || ([] as ICategoryResponse[]), isLoading: isFetched }
}
