import Carousel from '../../ui/carousel/carousel'
import { carouselItems } from '../../ui/carousel/carousel.data'
import CatalogPagination from '../catalog/CatalogPagination'
import { FC } from 'react'

const HomeComponent: FC = () => {
	return (
		<>
			<Carousel items={carouselItems} className='mb-10' />
			<CatalogPagination title='All products' />
		</>
	)
}

export default HomeComponent
