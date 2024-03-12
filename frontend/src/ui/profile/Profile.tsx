'use client'

import { useActions } from '../../hooks/useActions'
import { useIsAdminPanel } from '../../hooks/useIsAdminPanel'
import { useOutside } from '../../hooks/useOutside'
import { useProfile } from '../../hooks/useProfile'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { FiLogOut } from 'react-icons/fi'

export const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isAdminPanel } = useIsAdminPanel()
	const { logout } = useActions()
	const { isShow, setIsShow, ref } = useOutside(false)

	if (!profile?.avatarPath) return null

	return (
		<div className='relative ' ref={ref}>
			<button onClick={() => setIsShow(!isShow)} disabled={isAdminPanel}>
				{profile?.avatarPath && (
					<Image
						// onLoadingComplete={e => }
						width={43}
						height={43}
						src={
							profile?.avatarPath.includes('default-avatar.png')
								? '/default-avatar.png'
								: profile?.avatarPath
						}
						alt='profile'
						className='rounded-full border-primary border border-solid'
					/>
				)}
			</button>

			{!isAdminPanel && isShow && (
				<Fade cascade damping={0.1}>
					<div
						style={{
							top: 'calc(100%  + 1rem)'
						}}
						className='absolute w-40 shadow-2xl p-2 rounded-md right-2 z-20'
					>
						<Link
							onClick={() => setIsShow(false)}
							href={'/order'}
							className='bg-white shadow py-2 px-4 mb-2 block w-full
					rounded-md hover:text-primary duration-300 transition-colors'
						>
							My order
						</Link>
						<Link
							onClick={() => setIsShow(false)}
							href={'/favorites'}
							className='bg-white shadow py-2 px-4 mb-2 block w-full
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
								}
							}}
						>
							<FiLogOut />
							<span className='ml-2'> Logout</span>
						</button>
					</div>
				</Fade>
			)}
		</div>
	)
}
