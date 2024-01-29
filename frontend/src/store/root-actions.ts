import { carouselSlice } from './carousel/carousel.slice'
import { cartSlice } from './cart/cart.slice'
import { filterSlice } from './filters/filter.slice'
import * as userActions from './user/user.actions'

export const rootActions = {
	...userActions,
	...cartSlice.actions,
	...carouselSlice.actions,
	...filterSlice.actions
}
