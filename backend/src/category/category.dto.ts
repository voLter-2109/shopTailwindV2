import { IsString } from 'class-validator';
import { PrismaModels } from 'src/utils/get-type-model';

export class CategoryDto {
	@IsString()
	name: PrismaModels['Category']['name'];
}
