'use client'

import { FC } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsFillCartFill } from 'react-icons/bs'
import { useActions } from '../../hooks/useActions'
import { useCart } from '../../hooks/useCart'
import { IProductResponse } from '../../types/product.interface'

const AddToCardButton: FC<{ product: IProductResponse }> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find((cartItem: { product: { id: number } }) => {
		return cartItem.product.id === product.id
	})

	return (
		<div>
			<button
				className='text-primary'
				onClick={() => {
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({
								product,
								quantity: 1,
								price: product.price
						  })
				}}
			>
				{currentElement ? (
					<BsFillCartFill size='20px' />
				) : (
					<AiOutlineShoppingCart size='20px' />
				)}
			</button>
		</div>
	)
}

export default AddToCardButton
