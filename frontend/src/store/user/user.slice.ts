import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, register } from './user.actions'
import { IInitialState } from './user.interface'

const getStoreLOcal = (name: string) => {
	if (typeof localStorage !== 'undefined') {
		const Is = localStorage.getItem(name)
		return Is ? JSON.parse(Is) : null
	}
	return null
}

const initialState: IInitialState = {
	user: getStoreLOcal('user'),
	isLoading: false
}
//
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
		}),
			builder.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			}),
			builder.addCase(register.rejected, (state, action) => {
				state.isLoading = false
			})
		builder.addCase(login.pending, (state, action) => {
			// console.log(action.payload)
			state.isLoading = true
		}),
			builder.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			}),
			builder.addCase(login.rejected, (state, action) => {
				state.isLoading = false
				state.user = null
			}),
			builder.addCase(logout.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = null
			}),
			builder.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload.user
			})
	}
})
