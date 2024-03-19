'use client'

import { useActions } from '../../hooks/useActions'
import { useCart } from '../../hooks/useCart'
import { useOutside } from '../../hooks/useOutside'
import OrderService from '../../services/order.service'
import { ICartItem } from '../../types/cart.interface'
import { convertPrice } from '../../utils/convertPrice'
import Button from '../button/Button'
import { SquareButton } from '../button/SquareButton'
import style from './Cart.module.scss'
import { CartItem } from './CartItem'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

export const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)
	const { items, total } = useCart()
	const { push } = useRouter()
	const { reset } = useActions()

	const { mutate } = useMutation(
		['create order and payment'],
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
				console.log(data.confirmation)
				reset()
				// отправляет на сайт оплаты
				push(data.confirmation.confirmation_url)
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
					'rounded-md bg-secondary rounded-x1 px-5 py-3 text-sm menu z-20 text-white',
					'transition-all duration-700 ease-in-out',
					isShow ? 'translate-x-0' : 'translate-x-[1000px]'
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
					{!!items.length && (
						<>
							<div className='mt-7 md-5'>
								<Link className={'btn btn-black'} href={'/checkout'}>
									go to checkout
								</Link>
							</div>
							<Button
								variantColor='light'
								className='btn-link mt-5 md-2 transition  hover:scale-110'
								onClick={() => mutate()}
							>
								buy
							</Button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
