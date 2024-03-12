import { store } from '../store/store'
import { useTypedSelector } from './useTypedSelector'

export const useCart = () => {
	const state = store.getState()
	// console.log(state)
	const items = useTypedSelector(state => state.cart.items)

	const total = items.reduce(
		(acc: number, item: { price: number; quantity: number }) =>
			acc + item.price * item.quantity,
		0
	)

	return { items, total }
}
