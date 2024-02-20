import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatisticService {
	constructor(private prisma: PrismaService) {}

	async getMain() {
		const ordersCount = await this.prisma.order.count();
		const reviewsCount = await this.prisma.review.count();
		const usersCount = await this.prisma.user.count();
		const productsCount = await this.prisma.product.count();
		const totalAmount = await this.prisma.order.aggregate({
			_sum: {
				total: true
			}
		});

		return [
			{
				name: 'Users',
				value: usersCount
			},
			{ name: 'Product', value: productsCount },
			{
				name: 'Rewiews',
				value: reviewsCount
			},

			{
				name: 'Orders',
				value: ordersCount
			},
			{
				name: 'Total amount',
				value: totalAmount._sum.total || 0
			}
		];
	}
}
