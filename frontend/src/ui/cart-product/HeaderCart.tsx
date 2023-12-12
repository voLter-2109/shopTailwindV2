'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import { useCart } from '../../hooks/useCart'
import { useOutside } from '../../hooks/useOutside'
import OrderService from '../../services/order.service'
import { ICartItem } from '../../types/cart.interface'
import { convertPrice } from '../../utils/convertPrice'
import Button from '../button/Button'
import { SquareButton } from '../button/SquareButton'
import style from './Cart.module.scss'
import { CartItem } from './CartItem'

export const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()
	const { push } = useRouter()

	const { mutate } = useMutation(
		['create order andpayment'],
		() =>
			OrderService.placeOrder({
				items: items.map(
					(item: { price: any; quantity: any; product: { id: any } }) => ({
						price: item.price,
						quantity: item.quantity,
						productId: item.product.id
					})
				)
			}),
		{
			onSuccess({ data }) {
				push(data.confirmation.confirmation_url)
				// .then(() => reset())
			}
		}
	)

	return (
		<div className='relative' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					setIsShow(!isShow)
				}}
				number={items.length}
			/>

			<div
				className={cn(
					'absolute top-[4.2rem] w-96 -left-[20.5rem]',
					'rounded-md bg-secondary rounded-x1 px-5 py-3 text-sm menu z-20 text-white transition-all  delay-200',
					isShow ? 'open-menu' : 'close-menu'
				)}
			>
				<div className='font-bold text-center text-2xl mb-5 text-primary'>
					Cart
				</div>

				<div className={style.cart}>
					{items.length ? (
						items.map((item: ICartItem) => (
							<CartItem item={item} key={item.id + item.product.id} />
						))
					) : (
						<div className='font-light'>Cart is empty</div>
					)}
				</div>

				<div className={style.footer}>
					<div>Total:</div>
					<div> {convertPrice(total)}</div>
				</div>
				<div className='text-center'>
					<Button
						variantColor='light'
						className='btn-link mt-5 md-2 transition  hover:scale-110'
						onClick={() => mutate()}
					>
						buy
					</Button>
				</div>
			</div>
		</div>
	)
}
