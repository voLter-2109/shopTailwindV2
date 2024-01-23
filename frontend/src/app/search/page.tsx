'use client'

import Catalog from '../../component/catalog/Catalog'
import ProductService from '../../services/product/product.service'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'

const SearchPage: NextPage = () => {
	const searchParams = useSearchParams()
	const dataSearch = searchParams.get('searchTerm')

	const { data, isLoading } = useQuery(['search products', dataSearch], () =>
		ProductService.getAll({
			searchTerm: dataSearch as string
		})
	)
	// console.log(data)

	return (
		<Catalog
			products={data?.product || []}
			isLoading={isLoading}
			title={`Search result`}
		></Catalog>
	)
}

export default SearchPage
