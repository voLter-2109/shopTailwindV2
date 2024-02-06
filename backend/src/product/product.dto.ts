import { Prisma } from '@prisma/client';
import { ArrayMinSize, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string;

	@IsNumber()
	price: number;

	@IsOptional()
	@IsString()
	description?: string | Prisma.StringFieldUpdateOperationsInput;

	@IsString({ each: true })
	@ArrayMinSize(1)
	image: string[];

	@IsNumber()
	categoryId: number;

	@IsNumber()
	averageReviews?: number | Prisma.IntFieldUpdateOperationsInput;
}
