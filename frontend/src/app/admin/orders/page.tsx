import ErrorComponent from '../../../component/error/Error'
import { NO_INDEX_PAGE } from '../../../constant/app.constants'
import { Orders } from './Orders'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata = {
	title: 'Orders',
	...NO_INDEX_PAGE
}

const page = () => {
	return (
		<ErrorBoundary fallback={<ErrorComponent />}>
			<Orders />
		</ErrorBoundary>
	)
}

export default page
