import Catalog from '../../../component/catalog/Catalog'
import ErrorComponent from '../../../component/error/Error'
import { SITE_NAME } from '../../../constant/app.constants'
import ProductService from '../../../services/product/product.service'
import { Metadata, NextPage, ResolvingMetadata } from 'next'
import { ErrorBoundary } from 'react-error-boundary'

type Props = {
	params: { slug: string }
}

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
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
	const { data: products } = await ProductService.getByCategory(slug, "page slug")

	return {
		products
	}
}

const CategoryPage: NextPage<Props> = async ({ params }) => {
	const { products } = await getData(params.slug)

	// console.log(params)
	return (
		<ErrorBoundary fallback={<ErrorComponent />}>
			<Catalog products={products} title={params.slug} />
		</ErrorBoundary>
	)
}

export default CategoryPage
