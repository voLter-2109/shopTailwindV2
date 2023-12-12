'use client'

import Image from 'next/image'
import { FC } from 'react'
import { useProfile } from '../../hooks/useProfile'

export const HeaderProfile: FC = () => {
	const { profile } = useProfile()

	return (
		<div>
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
		</div>
	)
}
