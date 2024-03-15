import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from '../../api/api.helper'
import { removeFromStorage } from '../../services/auth/auth.helper'
import AuthService from '../../services/auth/auth.service'
import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword,{ rejectValue: string }>(
	'auth/regiter',
	async (data, thunkAPi) => {
		try {
			const response = await AuthService.main('register', data)
			return response
		} catch (error) {
			const er = errorCatch(error)
			return thunkAPi.rejectWithValue(er)
		}
	}
)

export const login = createAsyncThunk<
	IAuthResponse,
	IEmailPassword,
	{ rejectValue: string }
>('auth/login', async (data, thunkAPi) => {
	// console.log(data)
	try {
		const response = await AuthService.main('login', data)
		return response
	} catch (error) {
		// console.log(error)
		const er = errorCatch(error)
		// console.log(er)
		return thunkAPi.rejectWithValue(er)
	}
})

export const logout = createAsyncThunk('auth/logout', async () => {
	console.log('first')
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/login/access-token',
	async (_, thunkAPi) => {
		try {
			// console.log('first')
			const response = await AuthService.getNewTokens()
			// console.log(response)
			return response.data
		} catch (error) {
			if (errorCatch(error) === 'jwt expired') {
				thunkAPi.dispatch(logout())
			}

			return thunkAPi.rejectWithValue(error)
		}
	}
)
