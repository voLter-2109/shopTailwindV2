import { ErrorBoundary } from 'react-error-boundary'
import ErrorComponent from '../../../component/error/Error'
import { NO_INDEX_PAGE } from '../../../constant/app.constants'
import { Categories } from './Categories'

export const metadata = {
	title: 'Categories',
	...NO_INDEX_PAGE
}

const page = () => {
	return <ErrorBoundary fallback={<ErrorComponent />}>

	 <Categories />
	</ErrorBoundary>
}

export default page
