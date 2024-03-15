import { NO_INDEX_PAGE } from '../../constant/app.constants'
import ProductService from '../../services/product/product.service'
import CheckOut from './CheckOut'

export const metadata = {
	title: 'checkout',
	...NO_INDEX_PAGE
}

async function getProduct() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 20,
		ratings: ''
	})

	return data.product
}

export default async function CheckOutPage() {
	const data = await getProduct()

	return <CheckOut products={data} />
}
