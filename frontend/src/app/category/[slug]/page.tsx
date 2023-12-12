import { NextPage } from 'next'
import Catalog from '../../../component/catalog/Catalog'
import ProductService from '../../../services/product/product.service'

const CategoryPage: NextPage<{
	params: { slug: string }
}> = async ({ params }) => {
	const { product } = await getData(params.slug)

	return <Catalog products={product || []} title={product[0]?.category.name} />
}
export const getData = async (slug: string) => {
	const { data: product } = await ProductService.getByCategory(slug)

	return {
		product
	}
}

export default CategoryPage
