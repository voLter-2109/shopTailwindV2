'use client'

import Image from 'next/image'
import { FC } from 'react'
import { ICartItem } from '../../types/cart.interface'
import { convertPrice } from '../../utils/convertPrice'
import style from './Cart.module.scss'
import { CartActions } from './CartActions'

export const CartItem: FC<{ item: ICartItem }> = ({ item }) => {
	const imageLoader = () => {
		return item.product.image[0]
	}

	return (
		<div className={style.item}>
			<Image
				loader={imageLoader}
				src={item.product.image[0]}
				unoptimized={true}
				width='100'
				height='0'
				className='h-auto'
				alt={item.product.name}
				style={{
					borderRadius: '5px'
				}}
			/>
			<div>
				<div className={style.name}>{item.product.name}</div>
				<div className={style.price}>
					Price: {convertPrice(item.product.price)}
				</div>
				<div className={style.price}>
					Total: {convertPrice(item.product.price * item.quantity)}
				</div>

				<CartActions item={item} />
			</div>
		</div>
	)
}
