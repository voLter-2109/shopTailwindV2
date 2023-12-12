'use client'

import cn from 'clsx'
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
		<aside
			className='bg-secondary align-middle'
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '1.25rem 0',
				height: 'calc(100vh - 80 px)'
			}}
		>
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
