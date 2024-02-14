import { NO_INDEX_PAGE } from '../../constant/app.constants'
import DashBoard from './DashBoard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashBoardPage() {
	return <DashBoard />
}
