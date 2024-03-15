import { IUserResponse } from '../../types/user.interface'

export interface IUserState {
	email: string
	isAdmin: boolean
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserResponse | null
	isLoading: boolean
	errorMessage: string | undefined
}

export interface IEmailPassword {
	email: string
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUserResponse
}
