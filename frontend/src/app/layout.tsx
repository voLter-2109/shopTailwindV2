'use client'

import { FC, PropsWithChildren } from 'react'
import RootComponent from '../component/root-component/RootComponent'
import Providers from '../providers/Providers'
import './global.css'

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
