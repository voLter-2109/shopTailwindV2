import { useActions } from '../../../../hooks/useActions'
import { useCart } from '../../../../hooks/useCart'
import { IProductResponse } from '../../../../types/product.interface'
import Button from '../../../../ui/button/Button'
import { FC } from 'react'

interface IAddProductCartInline {
	product: IProductResponse
}

const AddToCartInline: FC<IAddProductCartInline> = ({ product }) => {
	const { addToCart, removeFromCart } = useActions()
	const { items } = useCart()

	const currentElement = items.find(
		cartItem => cartItem.product.id === product.id
	)

	return (
		<div className='mt-5 mx-auto flex justify-center'>
			<Button
				variantColor='dark'
				onClick={() =>
					currentElement
						? removeFromCart({ id: currentElement.id })
						: addToCart({ product, quantity: 1, price: product.price })
				}
			>
				{currentElement ? 'Remove from cart' : 'Add to cart'}
			</Button>
		</div>
	)
}

export default AddToCartInline
