import ErrorComponent from '../../component/error/Error'
import { NO_INDEX_PAGE } from '../../constant/app.constants'
import OrderPage from './MyOrders'
import type { Metadata } from 'next'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata: Metadata = {
	title: 'My Orders',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div>
			<ErrorBoundary fallback={<ErrorComponent />}>
				<OrderPage />
			</ErrorBoundary>
		</div>
	)
}
