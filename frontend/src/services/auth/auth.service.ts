import axios from 'axios'
import Cookies from 'js-cookie'
import { getContentType } from '../../api/api.helper'
import instanse from '../../api/api.interceptor'
import { REFRESH_TOKEN } from '../../constant/token.constants'
import { IAuthResponse, IEmailPassword } from '../../store/user/user.interface'
import { saveToStorage } from './auth.helper'

const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		// console.log(type)
		const response = await instanse<IAuthResponse>({
			method: 'POST',
			url: `/auth/${type}`,
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	},

	// ! отключена авторизаци на сервере
	// ! сделать не через axios  - instanse
	async getNewTokens() {
		const refreshToken = Cookies.get(REFRESH_TOKEN)

		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.SERVER_URL + '/auth/login/access-token',
			{ refreshToken },
			{
				headers: getContentType()
			}
		)

		if (response.data?.accessToken) saveToStorage(response.data)

		return response
	}
}

export default AuthService
