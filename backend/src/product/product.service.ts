import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class ProductService {
	constructor(
		private prisma: PrismaService,
		private paginationService: PaginationService,
		private categoryService: CategoryService
	) {}

	async getAll(dto: GetAllProductDto = {}) {
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

	private createFilter(dto: GetAllProductDto): Prisma.ProductWhereInput {
		const filters: Prisma.ProductWhereInput[] = [];
		console.log('dto', dto);

		if (dto.searchTerm) filters.push(this.getSearchTermFilter(dto.searchTerm));
		if (dto.ratings)
			filters.push(this.getRatingsFilter(dto.ratings.split('|').map(r => +r)));

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

	private getRatingsFilter(ratings: number[]): Prisma.ProductWhereInput {
		return {
			reviews: {
				some: {
					rating: {
						in: ratings
					}
				}
			}
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
				slug: ''
			}
		});

		return product.id;
	}

	async update(id: number, dto: ProductDto) {
		const { description, image, price, name, categoryId } = dto;

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
		return this.prisma.product.delete({ where: { id: id } });
	}
}
