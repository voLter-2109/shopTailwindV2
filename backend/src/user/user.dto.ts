import { IsEmail, IsOptional, IsString } from 'class-validator';
import { PrismaModels } from 'src/utils/get-type-model';

export class UserDto {
	@IsEmail()
	email: PrismaModels['User']["email"];

	@IsOptional()
	@IsString()
	password?: PrismaModels['User']["password"];

	@IsOptional()
	@IsString()
	name: PrismaModels['User']["name"];;

	@IsOptional()
	@IsString()
	avatarPath: PrismaModels['User']["avatarPath"];;

	@IsOptional()
	@IsString()
	phone?: PrismaModels['User']["phone"];;
}
