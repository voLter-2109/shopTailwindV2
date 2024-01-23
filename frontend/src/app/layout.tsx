'use client'

import ErrorComponent from '../component/error/Error'
import Header from '../component/header/Header'
import Sidebar from '../component/sidebar/Sidebar'
import Providers from '../providers/Providers'
import './global.css'
import './globalStyle.scss'
import { Roboto } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const golos = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin', 'cyrillic-ext'],
	display: 'swap',
	style: ['normal'],
	variable: '--font-roboto'
})

const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()

	return (
		<html lang='en' className={golos.variable}>
			<body key='V2' className='min-h-screen'>
				<Providers>
					{pathname === '/auth' ? (
						<main>{children}</main>
					) : (
						<div className='flex flex-col'>
							<Header />
							<div className='flex flex-row overflow-y-hidden'>
								<div className='w-[15vw]'>
									<Sidebar />
								</div>
								<main className='p-7 w-[85vw]'>
									<ErrorBoundary fallback={<ErrorComponent />}>
										{children}
									</ErrorBoundary>
								</main>
							</div>
						</div>
					)}
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout
