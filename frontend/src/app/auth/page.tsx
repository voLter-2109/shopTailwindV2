'use client'

import { NextPage } from 'next'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import useAuthRedirect from '../../hooks/useAuthRedirect'
import { IEmailPassword } from '../../store/user/user.interface'
import Button from '../../ui/button/Button'
import Heading from '../../ui/heading/Heading'
import Field from '../../ui/input/Field'
import { validEmail } from './valid-email'

const AuthComponent: NextPage = () => {
	useAuthRedirect()
	const { isLoading } = useAuth()
	const { login, register } = useActions()
	const [type, setType] = useState<'login' | 'register'>('login')

	const {
		register: fromRegister,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors
	} = useForm<IEmailPassword>({
		mode: 'onChange'
	})

	const onSubmit: SubmitHandler<IEmailPassword> = data => {
		if (type === 'login') {
			login(data)
		} else {
			register(data)
		}
		reset()
	}

	return (
		<section className='flex items-center h-screen '>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='rounded-lg bd-white  p-10 mx-auto bg-bg-gray shadow-2xl'
			>
				<Heading className='capitalize mb-5 text-center'>{type}</Heading>

				<Field
					{...fromRegister('email', {
						required: ' Email is required',
						pattern: { value: validEmail, message: 'enter a valid email' }
					})}
					placeholder='Email'
					Icon='./email.svg'
					style={{ marginBottom: '2.5em' }}
					error={errors.email?.message}
				/>
				<Field
					{...fromRegister('password', {
						required: ' Password is required',

						minLength: {
							value: 6,
							message: 'Password must be at least 6 characters long'
						}
					})}
					Icon='./password.svg'
					type='password'
					style={{ marginBottom: '2.5em' }}
					placeholder='Password'
					error={errors.password?.message}
				/>
				<Button variantColor='dark' className='mb-3' type='submit'>
					{!isLoading ? <span>Let`s go</span> : <span>Loading...</span>}
				</Button>

				<Button
					type='button'
					variantColor='light'
					{...{
						onClick: () => {
							setType(type === 'login' ? 'register' : 'login')
							clearErrors()
						}
					}}
				>
					{type === 'login' ? '...register' : '...login'}
				</Button>
			</form>
		</section>
	)
}

export default AuthComponent
