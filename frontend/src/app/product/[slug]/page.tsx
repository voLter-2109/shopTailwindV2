import ProductService from '../../../services/product/product.service'
import { IPageSlugParam, TypeParamSlug } from '../../../types/page-params'
import Product from './Product'
import { Metadata } from 'next'

export const revalidate = 3600

export const getData = async (params: TypeParamSlug) => {
	const product = await ProductService.getBySlug(params?.slug)

	const { data: similarProduct } = await ProductService.getSimilar(product.id)

	return { product, similarProduct }
}

export async function generateMetadata({
	params
}: IPageSlugParam): Promise<Metadata> {
	const { product } = await getData(params)

	return {
		title: product.name,
		description: product.description,
		category: product.category.name,
		openGraph: {
			images: product.image || [],
			description: product.description
		}
	}
}

export default async function Page({ params }: IPageSlugParam) {
	const { product, similarProduct } = await getData(params)

	return (
		<Product
			initialProduct={product}
			similarProduct={similarProduct}
			slug={params.slug}
		/>
	)
}
