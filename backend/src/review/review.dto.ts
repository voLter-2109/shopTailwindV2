import { IsNumber, IsString, Max, Min } from 'class-validator';
import { PrismaModels } from 'src/utils/get-type-model';

export class ReviewDto {
	@IsNumber()
	@Min(1)
	@Max(5)
	rating: PrismaModels['Review']['rating'];

	@IsString()
	text: PrismaModels['Review']['text'];
}
