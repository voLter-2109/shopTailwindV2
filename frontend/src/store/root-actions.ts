import { carouselSlice } from './carousel/carousel.slice'
import { cartSlice } from './cart/cart.slice'
import { filterSlice } from './filters/filter.slice'
import * as userActions from './user/user.actions'
import { userSlice } from './user/user.slice'

export const rootActions = {
	...userActions,
	...userSlice.actions,
	...cartSlice.actions,
	...carouselSlice.actions,
	...filterSlice.actions
}
