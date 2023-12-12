import { Prisma } from '@prisma/client';

export const returnCategoryObjectts: Prisma.CategorySelect = {
	id: true,
	name: true,
	slug: true
};
