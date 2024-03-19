import {
	Inject,
	Injectable,
	NotFoundException,
	forwardRef
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { convertToNumber } from 'src/utils/convert-to-number';
import { generateSlug } from 'src/utils/generate-slug';
import { EnumProductSort, GetAllProductDto } from './get-all.product.dto';
import { ProductDto } from './product.dto';
import {
	productReturnObject,
	productReturnObjectFulters
} from './return.product.object';

import { faker } from '@faker-js/faker';
import { getRandomNumber } from 'seeder/random-number';

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		@Inject(forwardRef(() => CategoryService))
		private categoryService: CategoryService
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		console.log(dto);
		const { perPage, skip } = this.paginationService.getPagination(dto);
		const filters = this.createFilter(dto);
		const product = await this.prisma.product.findMany({
			where: filters,

			orderBy: dto.sort ? this.getSortOption(dto.sort) : { price: 'desc' },
			skip: skip,
			take: perPage,
			select: productReturnObject
		});
		// _sum: {
		// 	reviews: {
		// 		rating: {
		// 			ratings: true
		// 		}
		// 	}
		// },

		// console.log(product);

		return {
			product,
			length: await this.prisma.product.count({
				where: filters
			})
		};
	}

	async fixImagetsts() {
		const { length, product } = await this.getAll();

		for (const item of product) {
			console.log(item);
			console.log('item: ' + item.categoryId);
			await this.update(item.id, {
				categoryId: item.category.id,
				description: item.description,
				price: item.price,
				name: item.name,
				averageReviews: item.averageReviews,
				image: Array.from({
					length: getRandomNumber(2, 7)
				}).map(() =>
					faker.image.urlLoremFlickr({
						width: 500,
						height: 500
					})
				)
			});
		}

		return {
			message: 'ok'
		};

		// update(id: number, dto: ProductDto) {
		// 	const { description, image, price, name, categoryId, averageReviews } = dto;
	}

	private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
		const filters: Prisma.ProductWhereInput[] = [];
		console.log('dto', dto);

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm));
		if (dto.ratings)
			filters.push(this.getRatingsFilter(convertToNumber(dto.ratings)));

		if (dto.minPrice || dto.maxPrice)
			filters.push(
				this.getPriceFilter(
					convertToNumber(dto.minPrice),
					convertToNumber(dto.maxPrice)
				)
			);

		if (dto.categoryId) filters.push(this.getCategoryFilter(+dto.categoryId));

		return filters.length ? { AND: filters } : {};
	}

	private getSortOption(
		sort: EnumProductSort
	): Prisma.ProductOrderByWithRelationInput[] {
		if (sort === EnumProductSort.LOW_PRICE) {
			return [{ price: 'asc' }];
		} else if (sort === EnumProductSort.HIGH_PRICE) {
			return [{ price: 'desc' }];
		} else if (sort === EnumProductSort.OLDEST) {
			return [{ createdAt: 'asc' }];
		} else {
			return [{ createdAt: 'desc' }];
		}
	}

	private getSearchTermFilter(searchTerm: string): Prisma.ProductWhereInput {
		return {
			OR: [
				{
					category: {
						name: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				},
				{
					name: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				},
				{
					description: {
						contains: searchTerm,
						mode: 'insensitive'
					}
				}
			]
		};
	}

	private getRatingsFilter(ratings: number): Prisma.ProductWhereInput {
		return {
			averageReviews: ratings
		};
	}

	private getPriceFilter(
		minPrice?: number,
		maxPrice?: number
	): Prisma.ProductWhereInput {
		let priceFilter: Prisma.IntFilter | undefined = undefined;

		if (minPrice) {
			priceFilter = {
				...priceFilter,
				gte: minPrice
			};
		}

		if (maxPrice) {
			priceFilter = {
				...priceFilter,
				lte: maxPrice
			};
		}

		return {
			price: priceFilter
		};
	}

	private getCategoryFilter(categoryId: number): Prisma.ProductWhereInput {
		return {
			categoryId: categoryId
		};
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: {
				id: id
			},
			select: productReturnObjectFulters
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async bySlug(slug: string) {
		console.log('get Product by slug');
		const product = await this.prisma.product.findUnique({
			where: {
				slug: slug
			},
			select: productReturnObjectFulters
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async byCategory(categorySlug: string) {
		console.log('get Product by category' + categorySlug);
		const product = await this.prisma.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: productReturnObjectFulters
		});

		if (!product) throw new NotFoundException('Product not found');

		return product;
	}

	async byCategoryLength(categorySlug: string) {
		console.log('get Product by category lenght' + categorySlug);
		const lenght = await this.prisma.product.count({
			where: {
				category: {
					slug: categorySlug
				}
			}
		});

		if (!lenght) throw new NotFoundException('Product not found');

		return lenght;
	}

	// return {

	// 	length: await this.prisma.product.count({
	// 		where: {
	// 			category: {
	// 				slug: categorySlug
	// 			}
	// 		}
	// 	})

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id);

		if (!currentProduct)
			throw new NotFoundException('Current Product not found');

		const product = await this.prisma.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: productReturnObject
		});

		return product;
	}

	async create() {
		const product = await this.prisma.product.create({
			data: {
				description: '',
				name: '',
				price: 0,
				slug: '',
				averageReviews: 0
			}
		});

		return product.id;
	}

	async update(id: number, dto: ProductDto) {
		const { description, image, price, name, categoryId, averageReviews } = dto;
		console.log('update', categoryId);
		await this.categoryService.byId(categoryId);

		return this.prisma.product.update({
			where: {
				id: id
			},
			data: {
				description: description,
				image: image,
				price: price,
				name: name,
				averageReviews: averageReviews,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		});
	}

	async delete(id: number) {
		console.log(id);

		const deleteReviews = this.prisma.review.deleteMany({
			where: {
				productId: id
			}
		});

		const deleteProdut = this.prisma.product.delete({
			where: {
				id: id
			}
		});

		return await this.prisma.$transaction([deleteReviews, deleteProdut]);
	}
}
