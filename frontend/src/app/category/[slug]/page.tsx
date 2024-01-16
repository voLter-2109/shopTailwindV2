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
	const { product } = await getData(params.slug)

	return {
		title: SITE_NAME + ' - ' + product[0].category.name,
		openGraph: {
			title: SITE_NAME + slug,
			images: product[0].image,
			description: `Lorem ipsum dolor sit ${product[0].category.name}`
		}
	}
}

export const getData = async (slug: string) => {
	const { data: product } = await ProductService.getByCategory(slug)

	return {
		product
	}
}

const CategoryPage: NextPage<Props> = async ({ params }) => {
	const { product } = await getData(params.slug)

	return (
		<ErrorBoundary fallback={<ErrorComponent />}>
			<Catalog products={product || []} title={product[0]?.category.name} />
		</ErrorBoundary>
	)
}

export default CategoryPage
