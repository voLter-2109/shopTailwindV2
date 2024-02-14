import HomeComponent from '../component/home/HomePage'
import { getSiteUrl } from '../config/url.config'
import { SITE_NAME } from '../constant/app.constants'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	icons: {
		icon: '/logo.svg'
	},
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	metadataBase: new URL(getSiteUrl()),
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		images: '/logo.svg'
	}
}

const HomePage = () => {
	return <HomeComponent />
}

export default HomePage
