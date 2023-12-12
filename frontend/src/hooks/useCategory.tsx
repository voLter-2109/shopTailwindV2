import { useQuery } from '@tanstack/react-query'
import CategoryService from '../services/category.service'
import { ICategoryResponse } from '../types/category.interface'
import { useAuth } from './useAuth'

export const useCategory = () => {
	const { user } = useAuth()
	// console.log(user)
	const { data } = useQuery(['getCategory'], () => CategoryService.getAll(), {
		select: ({ data }) => data,
		enabled: !!user
	})
	return { data: data || ([] as ICategoryResponse[]) }
}
