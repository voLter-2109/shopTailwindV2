import { Prisma } from '@prisma/client';
import { returnUserObject } from 'src/user/return_user.object';

export const returnReviewObjects: Prisma.ReviewSelect = {
	user: {
		select: returnUserObject
	},
	createdAt: true,
	text: true,
	rating: true,
	id: true
};
