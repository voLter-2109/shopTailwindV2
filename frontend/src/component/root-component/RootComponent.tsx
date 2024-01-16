import ErrorComponent from '../error/Error'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const RootComponent: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()
	// console.log(pathname)
	if (pathname === '/auth')
		return <main style={{ padding: '29px' }}>{children}</main>

	// console.log(children)

	return (
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
	)
}

export default RootComponent
