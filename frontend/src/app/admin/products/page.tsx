import ErrorComponent from '../../../component/error/Error'
import { NO_INDEX_PAGE } from '../../../constant/app.constants'
import { Product } from './Products'
import { ErrorBoundary } from 'react-error-boundary'

export const metadata = {
	title: 'Products',
	...NO_INDEX_PAGE
}

const page = () => {
	return (
		<ErrorBoundary fallback={<ErrorComponent />}>
			<Product />
		</ErrorBoundary>
	)
}

export default page
