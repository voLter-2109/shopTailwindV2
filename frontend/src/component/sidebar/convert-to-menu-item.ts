import { ICategoryResponse } from '../../types/category.interface'
import { IMenuItem } from './menu.interface'

export const convertToMenuItems = (
	categories: ICategoryResponse[]
): IMenuItem[] => {
	return categories.map(category => ({
		label: category.name,
		href: `/category/${category.slug}`,
		id: category.id
	}))
}
