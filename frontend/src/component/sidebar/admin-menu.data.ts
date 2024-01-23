import { getAdminUrl } from '../../config/url.config'
import { IMenuItem } from './menu.interface'

export const ADMIN_MENU: IMenuItem[] = [
	{
		label: 'Dashboard',
		href: getAdminUrl('/')
	},
	{
		label: 'Product',
		href: getAdminUrl('/product')
	},
	{
		label: 'Categories',
		href: getAdminUrl('/categories')
	},
	{
		label: 'Reviews',
		href: getAdminUrl('/review')
	},
	{ label: 'Order', href: getAdminUrl('/order') }
]
