"use client"

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import ProductService from '../../../services/product/product.service'
import { IProductResponse } from '../../../types/product.interface'
import Heading from '../../../ui/heading/Heading'

interface IProductPage {
  initialProduct: IProductResponse,
  similarProduct: IProductResponse[]
  slug?: string
}



const Product:FC<IProductPage> = ({initialProduct,similarProduct,slug=""}) => {

const {data: product} = useQuery(
  [`get product ${slug}, ${initialProduct.id}`],
   ()=> ProductService.getBySlug(slug), 
   {
    enabled: !!slug,
    initialData: initialProduct
  })

  return (
    <>
<Heading className='mb-1'>{product.name}</Heading>
    </>
  )
}

export default Product