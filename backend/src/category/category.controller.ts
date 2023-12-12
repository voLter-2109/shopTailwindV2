import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll();
	}

	@Get('by-slug/:slug')
	async getBySlug(@Param('slug') slug: string) {
		// console.log(slug);
		return this.categoryService.bySlug(slug);
	}

	@Get(':id')
	async getById(@Param('id') id: number) {
		return this.categoryService.byId(id);
	}

	@HttpCode(200)
	@Auth('admin')
	@Post()
	async create() {
		return this.categoryService.create();
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth('admin')
	@Put(':id')
	async update(@Param('id') id: number, @Body() dto: CategoryDto) {
		return this.categoryService.update(id, dto);
	}

	@HttpCode(200)
	@Auth('admin')
	@Delete(':id')
	async delete(@Param('id') id: number) {
		return this.categoryService.delete(id);
	}
}
