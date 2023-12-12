import { FC } from 'react'
import { IProductPagination } from '../../types/product.interface'
import CatalogPagination from '../catalog/CatalogPagination'

const HomeComponent: FC<{ products: IProductPagination }> = ({ products }) => {
	return <CatalogPagination data={products} title='All products' />
}

export default HomeComponent
