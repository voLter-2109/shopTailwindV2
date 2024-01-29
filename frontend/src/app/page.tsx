import HomeComponent from '../component/home/HomePage'
import { getSiteUrl } from '../config/url.config'
import { SITE_NAME, perPageProduct } from '../constant/app.constants'
import ProductService from '../services/product/product.service'
import { EnumProductSort } from '../types/product.interface'
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

async function getProducts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: perPageProduct,
		sort: EnumProductSort.HIGH_PRICE,
		ratings: ''
	})
	// console.log(data)
	return data
}

// const HomePage = async () => {
// 	const products = await getProducts()
// 	// console.log(products)

// 	if (!products) return <Loader />

// 	return <HomeComponent products={products} />
// }

const HomePage = async () => {
	return <HomeComponent />
}

export default HomePage
