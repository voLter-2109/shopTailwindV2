'use client'

import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { useCategory } from '../../hooks/useCategory'
import { useProfile } from '../../hooks/useProfile'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'
import { FiLogOut } from 'react-icons/fi'

const Sidebar: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const pathname = usePathname()
	const router = useRouter()
	const { data } = useCategory()
	const { profile } = useProfile()

	return (
		<aside className='bg-secondary align-middle fixed top-0 p-6 flex flex-col justify-between pt-28 h-full w-[15vw]'>
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
			{!!user ? (
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
			) : (
				<div></div>
			)}
		</aside>
	)
}

export default Sidebar
