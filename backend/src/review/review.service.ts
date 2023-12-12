import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { returnReviewObjects } from './return-review.object';
import { ReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
	constructor(
		private prisma: PrismaService,
		private productService: ProductService
	) {}

	async getAll() {
		return this.prisma.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObjects
		});
	}

	async create(userId: number, dto: ReviewDto, productId: number) {
		await this.productService.byId(productId);

		return this.prisma.review.create({
			data: {
				...dto,
				product: {
					connect: {
						id: productId
					}
				},
				user: {
					connect: {
						id: userId
					}
				}
			}
		});
	}

	async getAverageValueProductId(productId: number) {
		console.log('getAverageValueProductId');
		return this.prisma.review
			.aggregate({
				where: {
					productId: productId
				},
				_avg: { rating: true }
			})
			.then(data => data._avg);
	}
}

// Клиент Prisma позволяет вам aggregate  использовать числовые поля (такие как Int и Float) модели. Следующий запрос возвращает средний возраст всех пользователей:

// const aggregations = await prisma.user.aggregate({
//   _avg: {
//     age: true,
//   },
// })

// console.log('Average age:' + aggregations._avg.age)
