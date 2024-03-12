import Catalog from '../../../component/catalog/Catalog'
import ErrorComponent from '../../../component/error/Error'
import { SITE_NAME } from '../../../constant/app.constants'
import ProductService from '../../../services/product/product.service'
import { Metadata } from 'next'
import { FC } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export const revalidate = 3600

type Props = {
	params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = params.slug

	return {
		title: SITE_NAME + params.slug,
		openGraph: {
			title: SITE_NAME + '/' + slug,
			images: '/logo.svg',
			description: `Lorem ipsum dolor sit ${params.slug}`
		}
	}
}

export const getData = async (slug: string) => {
	const { data: products } = await ProductService.getByCategory(
		slug,
		'page slug'
	)

	return {
		products
	}
}

const CategoryPage: FC<Props> = async ({ params }) => {
	const { products } = await getData(params.slug)

	// console.log(params)
	return (
		<ErrorBoundary fallback={<ErrorComponent />}>
			<Catalog products={products} title={params.slug} />
		</ErrorBoundary>
	)
}

export default CategoryPage
