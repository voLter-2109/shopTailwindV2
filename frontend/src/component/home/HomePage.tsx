import Carousel from '../../ui/carousel/carousel'
import { carouselItems } from '../../ui/carousel/carousel.data'
import CatalogPagination from '../catalog/CatalogPagination'
import CustomLoading from '../custom-loading/CustomLoading'
import { FC, Suspense } from 'react'

const HomeComponent: FC = () => {
	return (
		<Suspense fallback={<CustomLoading />}>
			<Carousel items={carouselItems} className='mb-10' />
			<CatalogPagination title='All products' />
		</Suspense>
	)
}

export default HomeComponent
