import { ICreatePayment, YooCheckout } from '@a2seven/yoo-checkout';
import { Injectable } from '@nestjs/common';
import { EnumOrderStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { productReturnObject } from 'src/product/return.product.object';
import { v4 as uuidv4 } from 'uuid';
import { OrderDto } from './order.dto';
import { PaymentStatusDto } from './payment-status.dto';

const checkout = new YooCheckout({
	shopId: '266419',
	secretKey: 'test_Q9ejlTpPXFLi-DgAk8LSp3n0maZEk84pg9s8vdhj8yI'
});

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async getByUserId(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId: userId
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: productReturnObject
						}
					}
				}
			}
		});
	}

	async getAll() {
		return this.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: productReturnObject
						}
					}
				}
			}
		});
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity;
		}, 0);

		const order = this.prisma.order.create({
			data: {
				status: dto.status,
				items: {
					create: dto.items
				},
				total,
				User: {
					connect: {
						id: userId
					}
				}
			}
		});

		const createPayload: ICreatePayment = {
			amount: {
				value: total.toFixed(2),
				currency: 'EN'
			},
			payment_method_data: {
				type: 'bank_card'
			},
			confirmation: {
				type: 'redirect',
				return_url: 'http://localhost:3000/thanks'
			},
			description: `Order#${(await order).id}`
		};
		const idempotenceKey = uuidv4();

		try {
			const payment = await checkout.createPayment(
				createPayload,
				idempotenceKey
			);
			return payment;
		} catch (error) {
			// console.error('error');
			return error;
		}
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			const paymentId = dto.object.id;
			const payload: any = dto.object.amount;
			// console.log(dto.event);

			const payment = checkout.capturePayment(paymentId, payload);
			return payment;
		}

		if (dto.event === 'payment.succeeded') {
			const orderId = Number(dto.object.description.split('#')[1]);
			// console.log(orderId);
			await this.prisma.order.update({
				where: {
					id: orderId
				},
				data: {
					status: EnumOrderStatus.PAYED
				}
			});
			return true;
		}

		return true;
	}
}
