import type { Metadata } from 'next'
import HomeComponent from '../component/home/HomePage'
import ProductService from '../services/product/product.service'
import { EnumProductSort, perPageProduct } from '../types/product.interface'

export const metadata: Metadata = {
	description: 'shopping'
}

async function getProducts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: perPageProduct,
		sort: EnumProductSort.HIGH_PRICE,
		ratings: ''
	})

	return data
}

const HomePage = async () => {
	const products = await getProducts()
	// console.log(products)

	return <HomeComponent products={products} />

}

export default HomePage
