import { store } from '../store/store'
import { ICartItem } from '../types/cart.interface'
import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const state = store.getState()
	// console.log(state)
	const items: ICartItem[] = useTypedSelector(state => state.cart.items)
	console.log(items)
	const total = items.reduce(
		(acc: number, item: { price: number; quantity: number }) =>
			acc + item.price * item.quantity,
		0
	)
	console.log(total)

	return { items, total }
}
