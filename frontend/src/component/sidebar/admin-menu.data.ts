import { getAdminUrl } from '../../config/url.config'
import { IMenuItem } from './menu.interface'

export const ADMIN_MENU: IMenuItem[] = [
	{
		label: 'Dashboard',
		href: getAdminUrl(''),
		id: 1
	},
	{
		label: 'Product',
		href: getAdminUrl('/products'),
		id: 2
	},
	{
		label: 'Categories',
		href: getAdminUrl('/categories'),
		id: 3
	},
	{
		label: 'Reviews',
		href: getAdminUrl('/reviews'),
		id: 4
	},
	{
		label: 'Order',
		href: getAdminUrl('/orders'),
		id: 5
	}
]
