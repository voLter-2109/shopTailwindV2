import { IProductPagination } from '../../types/product.interface'
import Carousel from '../../ui/carousel/carousel'
import { carouselItems } from '../../ui/carousel/carousel.data'
import CatalogPagination from '../catalog/CatalogPagination'
import { FC } from 'react'

const HomeComponent: FC = () => {
// const HomeComponent: FC<{ products: IProductPagination }> = ({ products }) => {
	return (
		<>
			<Carousel items={carouselItems} className='mb-10' />
			{/* <CatalogPagination data={products} title='All products' /> */}
			<CatalogPagination title='All products' />
		</>
	)
}

export default HomeComponent
