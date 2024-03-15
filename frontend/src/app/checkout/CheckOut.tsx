import { useActions } from '../../hooks/useActions'
import { useCart } from '../../hooks/useCart'
import OrderService from '../../services/order.service'
import { IProductResponse } from '../../types/product.interface'
import Button from '../../ui/button/Button'
import Heading from '../../ui/heading/Heading'
import { convertPrice } from '../../utils/convertPrice'
import CkeckOutItem from './CheckOutItem'
import style from './Checkout.module.scss'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'

const CheckOut: FC<{ products: IProductResponse[] }> = ({ products = [] }) => {
	const { items, total } = useCart()
	const { reset } = useActions()
	const { push } = useRouter()

	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.placeOrder({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				reset()
				push(data.confirmation.confirmation_url)
			}
		}
	)

	return (
		<>
			{items.length ? (
				<section className={style.checkout}>
					<div>
						<Heading className='mb-6'>CheckOut</Heading>
						<div className={style.list}>
							{items.map(item => (
								<CkeckOutItem key={item.id} product={item.product} />
							))}
						</div>
						<div className={style.footer}>
							<div className={style.total}>
								<div>Total cost:</div>
								<div>{convertPrice(total)}</div>
							</div>
							<Button
								variantColor='light'
								size='lg'
								className='mt-5 mb-2'
								onClick={() => mutate()}
							>
								PlaceOrder
							</Button>
						</div>
					</div>
				</section>
			) : (
				<></>
			)}
		</>
	)
}

export default CheckOut
