import { ErrorBoundary } from 'react-error-boundary'
import ErrorComponent from '../../../component/error/Error'
import { NO_INDEX_PAGE } from '../../../constant/app.constants'
import { Reviews } from './Reviews'

export const metadata = {
	title: 'Reviews',
	...NO_INDEX_PAGE
}

const page = () => {
	return  <ErrorBoundary fallback={<ErrorComponent />}>
		<Reviews />
		</ErrorBoundary>
}

export default page
