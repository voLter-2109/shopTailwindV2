import instanse from '../api/api.interceptor'
import { IFullUser, IUserResponse, UserTypeData } from '../types/user.interface'

const USER = '/user'

const UserService = {
	async getProfile() {
		return instanse<IFullUser>({
			method: 'GET',
			url: `${USER}/profile`
		})
	},

	async updateProfile(data: UserTypeData) {
		return instanse<IUserResponse>({
			method: 'PUT',
			url: `${USER}/profile`,
			data: data
		})
	},

	async toggleFavorite(productId: string | number) {
		return instanse<IUserResponse>({
			method: 'PATCH',
			url: `${USER}/profile/favorites/${productId}`
		})
	}
}

export default UserService
