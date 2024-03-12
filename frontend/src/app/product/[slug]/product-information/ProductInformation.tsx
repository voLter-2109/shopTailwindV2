import { useProfile } from '../../../../hooks/useProfile'
import { IProductResponse } from '../../../../types/product.interface'
import { IFullUser } from '../../../../types/user.interface'
import FavoriteButton from '../../../../ui/product-item/FavoriteButton'
import { convertPrice } from '../../../../utils/convertPrice'
import AddToCartInline from './AddToCartInline'
import Link from 'next/link'
import { FC } from 'react'
import { FaLock } from 'react-icons/fa'

interface IProductInformation {
	product: IProductResponse,
	profile: IFullUser
}

const ProductInformation: FC<IProductInformation> = ({ product,profile }) => {
	return (
		<div className='bg-white rounded-lg shadow-lg p-6 relative h-max'>
			<div className='text-5xl font-semibold'>
				{convertPrice(product.price)}
			</div>
			<div className='mt-2'>
				💲6 Shipping
				<Link href='/' className='text-primary font-semibold ml-2'>
					Details
				</Link>
			</div>
			<span className='opacity-50 mt-1 text-sm block'>
				Sales taxes apple at checkout
			</span>
			<div className='mt-4 text-sm'>
				<span className='opacity-50 mr-1'>Delivery</span>Monday, December 10
			</div>
			<AddToCartInline product={product} />
			<p className='flex justify-center mt-2 opacity-40 text-sm'>
				<FaLock className='mr-2' />
				Secure transaction
			</p>
			<div className='absolute top-6 right-6'>
				<FavoriteButton productId={product.id} profile={profile} />
			</div>
		</div>
	)
}

export default ProductInformation
