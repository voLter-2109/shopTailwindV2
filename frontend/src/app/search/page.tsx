'use client'

import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
import Catalog from '../../component/catalog/Catalog'
import ProductService from '../../services/product/product.service'

const SearchPage: NextPage = () => {
	const searchParams = useSearchParams()
	const dataSearch = searchParams.get('term')

	const { data } = useQuery(['search products', dataSearch], () =>
		ProductService.getAll({
			searchTerm: dataSearch as string
		})
	)
	// console.log(data)

	return (
		<Catalog
			products={data?.product || []}
			title={`Search result: ${dataSearch}`}
		></Catalog>
	)
}

export default SearchPage
