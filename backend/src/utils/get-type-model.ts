import type { Prisma, PrismaClient } from '@prisma/client';

// ! как type перевести в enum
export type ModelNames = Prisma.ModelName;

export type PrismaModels = {
	[M in ModelNames]: Exclude<
		Awaited<ReturnType<PrismaClient[Uncapitalize<M>]['findUnique']>>,
		null
	>;
};
