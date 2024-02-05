import CategoryService from '../services/category.service'
import { ICategoryResponse } from '../types/category.interface'
import { useAuth } from './useAuth'
import { useQuery } from '@tanstack/react-query'

export const useCategory = () => {
	const { user } = useAuth()
	// console.log(user)
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
