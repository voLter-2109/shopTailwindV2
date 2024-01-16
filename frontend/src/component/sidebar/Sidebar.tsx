'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { useCategory } from '../../hooks/useCategory'

const Sidebar: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const pathname = usePathname()
	const router = useRouter()
	const { data } = useCategory()
	// console.log(pathname)

	return (
		<aside className='bg-secondary align-middle fixed top-0 p-6 flex flex-col justify-between h-full w-[15vw]'>
			<Link
				href='/'
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Image
					unoptimized={true}
					width='0'
					height='0'
					className='w-full h-auto'
					style={{ width: '45px', height: '45px' }}
					src={'/logo.svg'}
					alt='logo'
					priority={true}
				/>
			</Link>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					color: 'white',
					textAlign: 'center'
				}}
			>
				{!!data &&
					data.map((slug: any) => {
						// console.log(slug)
						return (
							<Link
								key={slug.id}
								href={
									pathname.includes('category')
										? slug.slug
										: `category/${slug.slug}`
								}
								className={cn('hover:text-red-500')}
							>
								<span
									className={cn({
										'text-primary': pathname === `/category/${slug.slug}`
									})}
								>
									{slug.name}
								</span>
							</Link>
						)
					})}
			</div>
			<Link
				href='/order'
				className={cn(
					'text-center ',
					pathname.includes('/order') ? 'text-primary' : 'text-white'
				)}
			>
				My order
			</Link>
			{!!user && (
				<button
					style={{ justifyContent: 'center' }}
					className='text-white flex items-center '
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
			)}
		</aside>
	)
}

export default Sidebar
