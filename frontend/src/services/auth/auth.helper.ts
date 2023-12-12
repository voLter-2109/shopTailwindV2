import Cookies from 'js-cookie'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constant/token.constants'
import { IAuthResponse, ITokens } from '../../store/user/user.interface'

export const saveTokenStorage = (data: ITokens) => {
	Cookies.set(ACCESS_TOKEN, data.accessToken)
	Cookies.set(REFRESH_TOKEN, data.refreshToken)
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(ACCESS_TOKEN)
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem('user') || '{}')
}

export const removeFromStorage = () => {
	Cookies.remove(ACCESS_TOKEN)
	Cookies.remove(REFRESH_TOKEN)
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	// console.log("saveToStorage")
	saveTokenStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
