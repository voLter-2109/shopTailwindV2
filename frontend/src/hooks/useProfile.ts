import { useQuery } from '@tanstack/react-query'
import UserService from '../services/user.service'
import { IFullUser } from '../types/user.interface'
import { useAuth } from './useAuth'

export const useProfile = () => {
	const { user } = useAuth()
	// console.log(user)
	const { data } = useQuery(['getProfile'], () => UserService.getProfile(), {
		select: ({ data }) => data,
		enabled: !!user
	})
	
	// console.log(data)
	// console.log("profile")
	return { profile: data || ({} as IFullUser) }
}
