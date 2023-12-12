import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

const RootComponent: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()
	// console.log(pathname)
	if (pathname === '/auth')
		return <main style={{ padding: '29px' }}>{children}</main>

	// console.log(children)

	return (
		<div>
			<Header />
			<div
				className='grid '
				style={{
					gridTemplateColumns: '1fr 4fr',
					height: 'calc(100vh - 5rem)'
				}}
			>
				<Sidebar />
				<main style={{ padding: '29px' }}>
					<ErrorBoundary fallback={<div>Something went wrong</div>}>
						{children}
					</ErrorBoundary>
				</main>
				{/* <div id='modal'></div> */}
			</div>
		</div>
	)
}

export default RootComponent
