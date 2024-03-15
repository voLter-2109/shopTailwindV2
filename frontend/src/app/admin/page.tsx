import { NO_INDEX_PAGE } from '../../constant/app.constants'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const DashBoard = dynamic(() => import('./DashBoard'))

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashBoardPage() {
	return <DashBoard />
}
