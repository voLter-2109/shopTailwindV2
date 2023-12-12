import instanse from '../api/api.interceptor'
import { ICategoryResponse } from '../types/category.interface'

const CATEGORY = '/categories'

const CategoryService = {
	async getAll() {
		// console.log('get All Category cervice')
		return instanse<ICategoryResponse[]>({
			method: 'GET',
			url: CATEGORY
		})
	},

	async getById(id: string | number) {
		return instanse<ICategoryResponse>({
			method: 'GET',
			url: `${CATEGORY}/${id}`
		})
	},

	async getBySlug(slug: string | number) {
		return instanse<ICategoryResponse>({
			method: 'GET',
			url: `${CATEGORY}/by-slug/${slug}`
		})
	},

	async create() {
		return instanse<ICategoryResponse>({
			method: 'POST',
			url: CATEGORY
		})
	},

	async update(id: string | number, name: string) {
		return instanse<ICategoryResponse>({
			method: 'PUT',
			url: `${CATEGORY}/${id}`,
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instanse<ICategoryResponse>({
			method: 'DELETE',
			url: `${CATEGORY}/${id}`
		})
	}
}

export default CategoryService
