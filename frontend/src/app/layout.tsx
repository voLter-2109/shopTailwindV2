'use client'

import type { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import RootComponent from '../component/root-component/RootComponent'
import { getSiteUrl } from '../config/url.config'
import { SITE_NAME } from '../constant/app.constants'
import Providers from '../providers/Providers'
import './global.css'

export const metadata: Metadata = {
	icons: {
		icon: '/logo.svg'
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME
	}
}

const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	// console.log(children)
	return (
		<html lang='en'>
			<body key='V2' className='min-h-screen'>
				<Providers>
					<RootComponent>{children}</RootComponent>
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
