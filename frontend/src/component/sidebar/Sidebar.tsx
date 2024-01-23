'use client'

import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { useCategory } from '../../hooks/useCategory'
import { useIsAdminPanel } from '../../hooks/useIsAdminPanel'
import { ADMIN_MENU } from './admin-menu.data'
import { convertToMenuItems } from './convert-to-menu-item'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const Sidebar: FC = () => {
	const { user } = useAuth()
	const { logout } = useActions()
	const router = useRouter()
	const { data } = useCategory()
	const { isAdminPanel, pathname } = useIsAdminPanel()

	return (
		<aside className='p-6 z-50'>
			<div className='flex flex-col text-center'>
				<span className='my-4 font-bold text-2xl'>
					{isAdminPanel ? 'Menu:' : 'Categories:'}
				</span>
				<ul>
					{(isAdminPanel ? ADMIN_MENU : convertToMenuItems(data)).map(item => {
						return (
							<li key={item.id}>
								<Link
									href={`${item.href}`}
									className={cn(
										'hover:text-red-500 text-primary',
										pathname === item.href && 'font-extrabold'
									)}
								>
									{item.label}
								</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</aside>
	)
}

export default Sidebar

// href={
// 	pathname.includes('category')
// 		? item.slug
// 		: `category/${slug.slug}`
// }

{
	/* <span
	className={cn({
'font-extrabold': pathname === `/category/${item.href}`
})}
> */
}
