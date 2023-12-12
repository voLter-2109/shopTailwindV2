import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { IProductResponse } from '../../types/product.interface'
import { IFullUser } from '../../types/user.interface'
import { convertPrice } from '../../utils/convertPrice'
import AddToCardButton from './AddToCArtButton'
import ProductRating from './ProductRating'

const DynamicFavoritButton = dynamic(() => import('./FavoriteButton'), {
	ssr: false
})

const ProducItem: FC<{ product: IProductResponse; profile: IFullUser }> = ({
	product,
	profile
}) => {
	const imageLoader = () => {
		return product.image[0]
	}
	return (
		<div>
			<div className='bg-white rounded-xl relative overflow-hidden'>
				<div className='absolute  top-3 left-3 z-10 bg-white p-1 rounded-lg'>
					<DynamicFavoritButton productId={product.id} profile={profile} />
					<AddToCardButton product={product} />
				</div>
				<Link href={`/product/${product.slug}`}>
					<Image
						style={{
							width: '250px',
							maxHeight: '190px'
						}}
						width='0'
						height='0'
						priority 
						unoptimized={true}
						loader={imageLoader}
						src={product.image[0]}
						alt={product.name}
					/>
				</Link>
			</div>
			<Link href={`/product/${product.slug}`}>
				<h3 className='mb-1  text-base font-semibold'>{product.name}</h3>
			</Link>
			<Link
				href={`/category/${product.category.slug}`}
				className='text-aqua text-sm mb-2'
			>
				{product.category.name}
			</Link>
			<ProductRating product={product} />
			<div className='text-2xl font-semibold'>
				{convertPrice(product.price)}
			</div>
		</div>
	)
}

export default ProducItem
