'use client'

import ErrorComponent from '../component/error/Error'
import Header from '../component/header/Header'
import Sidebar from '../component/sidebar/Sidebar'
import Providers from '../providers/Providers'
import './global.css'
import './globalStyle.scss'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()

	if (pathname === '/auth')
		return (
			<html lang='en'>
				<body key='V2' className='min-h-screen'>
					<Providers>
						<main style={{ padding: '29px' }}>{children}</main>
					</Providers>
				</body>
			</html>
		)

	return (
		<html lang='en'>
			<body key='V2' className='min-h-screen'>
				<Providers>
					<div>
						<Header />
						<div>
							<Sidebar />
							<main className='p-7 pl-[20vw]'>
								<ErrorBoundary fallback={<ErrorComponent />}>
									{children}
								</ErrorBoundary>
							</main>
							{/* <div id='modal'></div> */}
						</div>
					</div>
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout

// const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
// 	console.log(children)
// 	return (
// 		<html lang='en'>
// 			<body key='V2'>
// 				<div>
// 					{/* <Header /> */}

// 					<div
// 						className='grid'
// 						style={{
// 							gridTemplateColumns: '1fr 4fr',
// 							height: 'calc(100vh - 5rem)'
// 						}}
// 					>
// 						{/* <Sidebar /> */}

// 						<main className='p-12'>
// 							<Providers>{children}</Providers>
// 						</main>
// 						<div id='modal'></div>
// 					</div>
// 				</div>
// 			</body>
// 		</html>
// 	)
// }

// export default RootLayout
