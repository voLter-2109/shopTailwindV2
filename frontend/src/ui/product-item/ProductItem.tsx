import { IProductResponse } from '../../types/product.interface'
import { IFullUser } from '../../types/user.interface'
import { convertPrice } from '../../utils/convertPrice'
import AddToCardButton from './AddToCArtButton'
import FavoriteButton from './FavoriteButton'
import ProductRating from './ProductRating'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

const ProducItem: FC<{ product: IProductResponse; profile: IFullUser }> = ({
	product,
	profile
}) => {
	const imageLoader = () => {
		return product.image[0]
	}
	return (
		<div className='border border-black/25 shadow-2xl rounded-xl  p-2'>
			<div
				className='bg-[rgb(15,23,42)] rounded-xl
			 relative  w-[220px] h-[150px] overflow-hidden'
			>
				<div className='absolute  top-1 right-1 z-10 bg-white p-1  rounded-xl'>
					<FavoriteButton productId={product.id} profile={profile} />
					<AddToCardButton product={product} />
				</div>
				<Link href={`/product/${product.slug}`}>
					<Image
						className='w-[220px] h-[150px] block mx-auto'
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
			<ProductRating product={product} isText />
			<div className='text-2xl font-semibold'>
				{convertPrice(product.price)}
			</div>
		</div>
	)
}

export default ProducItem
