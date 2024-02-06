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
	const { lenght } = await getDataLenght(params.slug)

	return {
		title:
			SITE_NAME + ' - ' + (lenght && +lenght > 0 ? params.slug : 'category'),
		openGraph: {
			title: SITE_NAME + ' ' + slug,
			images: '/logo.svg',
			description: `Lorem ipsum dolor sit ${
				lenght && +lenght > 0 ? params.slug : ''
			}`
		}
	}
}

export const getDataLenght = async (slug: string) => {
	const { data: lenght } = await ProductService.getByCategoryLenght(slug)
	// console.log(lenght)
	return {
		lenght
	}
}

export const getData = async (slug: string) => {
	const { data: products } = await ProductService.getByCategory(slug)

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
