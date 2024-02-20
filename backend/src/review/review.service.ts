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

		await this.prisma.review.create({
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

		const avarageReview = await this.getAverageValueProductId(productId);

		return this.prisma.product.update({
			where: {
				id: productId
			},
			data: {
				averageReviews: avarageReview.rating
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


