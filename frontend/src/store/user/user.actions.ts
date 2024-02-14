import { errorCatch } from '../../api/api.helper'
import { removeFromStorage } from '../../services/auth/auth.helper'
import AuthService from '../../services/auth/auth.service'
import { IAuthResponse, IEmailPassword } from './user.interface'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/regiter',
	async (data, thunkAPi) => {
		try {
			const response = await AuthService.main('register', data)
			return response
		} catch (error) {
			return thunkAPi.rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async (data, thunkAPi) => {
		// console.log(data)
		try {
			const response = await AuthService.main('login', data)
			return response
		} catch (error) {
			return thunkAPi.rejectWithValue(error)
		}
	}
)

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
