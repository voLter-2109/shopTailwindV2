'use client'

import { useCategory } from '../../hooks/useCategory'
import { useIsAdminPanel } from '../../hooks/useIsAdminPanel'
import { ADMIN_MENU } from './admin-menu.data'
import { convertToMenuItems } from './convert-to-menu-item'
import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import { RxExit } from 'react-icons/rx'

const Sidebar: FC = () => {
	const { data } = useCategory()
	const { isAdminPanel, pathname } = useIsAdminPanel()

	return (
		<aside className='p-6 z-50 '>
			<div className='flex flex-col justify-between text-center min-h-[80vh] '>
				<div>
					<span className='font-bold text-2xl mb-4 inline-block'>
						{isAdminPanel ? 'Menu:' : 'Categories:'}
					</span>
					<ul>
						{(isAdminPanel ? ADMIN_MENU : convertToMenuItems(data)).map(
							item => {
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
							}
						)}
						<li className='text-sm opacity-50 w-[15vw]'>🤔остается вопрос с оптимизаций, долгое срабатывание Loadind при навигации</li>
					</ul>
				</div>

				{isAdminPanel && (
					<Link
						href='/'
						className={cn('hover:text-red-500 text-primary mx-auto ')}
					>
						<RxExit size={30} />
					</Link>
				)}
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
