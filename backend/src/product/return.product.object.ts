import { Prisma } from '@prisma/client';
import { returnCategoryObjectts } from 'src/category/return-category.object';
import { returnReviewObjects } from 'src/review/return-review.object';

export const productReturnObject: Prisma.ProductSelect = {
	image: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true,
	averageReviews: true,
	category: {
		select: returnCategoryObjectts
	},
	reviews: {
		select: returnReviewObjects,
		orderBy: {
			createdAt: 'desc'
		}
	}
};

export const productReturnObjectFulters: Prisma.ProductSelect = {
	...productReturnObject
};
