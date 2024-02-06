import instanse from '../../api/api.interceptor'
import {
	ICategoryLenghtResponse,
	IProductData,
	IProductPagination,
	IProductResponse,
	TypeProductDataFilters
} from '../../types/product.interface'

const PRODUCT = '/products'

const ProductService = {
	async getAll(queryData: TypeProductDataFilters = {}) {
		// console.log('get All service')
		const { data } = await instanse<IProductPagination>({
			method: 'GET',
			url: PRODUCT,
			params: queryData
		})
		// console.log(data)
		return data
	},

	async getSimilar(productId: string | number) {
		return instanse<IProductData[]>({
			method: 'GET',
			url: `${PRODUCT}/similar/${productId}`
		})
	},
	async getBySlug(slug: string) {
		const { data } = await instanse<IProductData>({
			method: 'GET',
			url: `${PRODUCT}/by-slug/${slug}`
		})

		return data
	},

	async getByCategory(categorySlug: string) {
		return instanse<IProductResponse[]>({
			method: 'GET',
			url: `${PRODUCT}/by-category/${categorySlug}`
		})
	},

	async getByCategoryLenght(categorySlug: string) {
		return instanse<ICategoryLenghtResponse>({
			method: 'GET',
			url: `${PRODUCT}/by-category-lenght/${categorySlug}`
		})
	},

	async getById(id: string | number) {
		return instanse<IProductData>({
			method: 'GET',
			url: `${PRODUCT}/${id}`
		})
	},

	async create() {
		return instanse<IProductData>({
			method: 'POST',
			url: PRODUCT
		})
	},

	async update(id: string | number, data: IProductData) {
		return instanse<IProductData>({
			method: 'PUT',
			url: `${PRODUCT}/${id}`,
			data: data
		})
	},

	async delete(id: string | number) {
		return instanse<IProductData>({
			method: 'DELETE',
			url: `${PRODUCT}/${id}`
		})
	}
}

export default ProductService
