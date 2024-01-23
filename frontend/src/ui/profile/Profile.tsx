'use client'

import { useOutside } from '../../hooks/useOutside'
import { useProfile } from '../../hooks/useProfile'
import { logout } from '../../store/user/user.actions'
import Image from 'next/image'
import Link from 'next/link'
import router from 'next/router'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'

export const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isShow, setIsShow, ref } = useOutside(false)

	if (!profile?.avatarPath) return null

	return (
		<div className='relative ' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				{profile?.avatarPath && (
					<Image
						// onLoadingComplete={e => }
						width={43}
						height={43}
						src={profile?.avatarPath}
						alt='profile'
						className='rounded-full border-primary border border-solid'
					/>
				)}
			</button>
			{isShow && (
				<div
					style={{
						top: 'calc(100% -1rem)'
					}}
					className='absolute w-40 right-2 z-20'
				>
					<Link
						href={'/order'}
						className='bg-white shadow py-2 px-4 block w-full
					rounded-md hover:text-primary duration-300 transition-colors'
					>
						My order
					</Link>
					<Link
						href={'/favorites'}
						className='bg-white shadow py-2 px-4 block w-full
					rounded-md hover:text-primary duration-300 transition-colors'
					>
						Favorites
					</Link>
					<button
						className='bg-white shadow py-2 px-4 w-full flex items-center
						rounded-md hover:text-primary duration-300 transition-colors'
						{...{
							onClick: () => {
								logout()
								router.replace('/auth')
							}
						}}
					>
						<FiLogOut />
						<span className='ml-2'> Logout</span>
					</button>
				</div>
			)}
		</div>
	)
}
