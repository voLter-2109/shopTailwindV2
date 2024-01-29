import { NO_INDEX_PAGE } from '../../constant/app.constants'
import ProductExplorer from './ProductExplorer'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Поиск',
	...NO_INDEX_PAGE
}

export default function ExplorerPage() {
	return <ProductExplorer />
}
