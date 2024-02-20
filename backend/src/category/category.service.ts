import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';
import { generateSlug } from 'src/utils/generate-slug';
import { CategoryDto } from './category.dto';
import { returnCategoryObjectts } from './return-category.object';

@Injectable()
export class CategoryService {
	constructor(private prisma: PrismaService, 
		@Inject(forwardRef(() => ProductService))
		private productService: ProductService,
		 ) {}

	async byId(id: number) {
		const category = await this.prisma.category.findUnique({
			where: {
				id: +id
			},
			select: returnCategoryObjectts
		});

		if (!category) {
			throw new Error(`No category found`);
		}

		return category;
	}

	async bySlug(slug: string) {
		const category = await this.prisma.category.findUnique({
			where: {
				slug: slug
			},
			select: returnCategoryObjectts
		});

		if (!category) {
			throw new NotFoundException(`No category found`);
		}

		return category;
	}

	async getAll() {
		console.log('getAll'); 
		return this.prisma.category.findMany({
			select: returnCategoryObjectts
		});
	}

	async update(id: number, dto: CategoryDto) {
		return this.prisma.category.update({
			where: { id: +id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		});
	}

	async create() {
		return this.prisma.category.create({
			data: {
				name: '',
				slug: ''
			}
		});
	}

	async delete(id: number) {
		const productInCategory = await  this.prisma.product.findMany({
			where:{
			categoryId:+id	
			}})
			

		// 	console.log(productInCategory.then((item) =>item ))
			if(productInCategory.length) {

				for(let item of productInCategory) {
					await this.productService.delete(item.id)
				}
			} 
		

		 await this.prisma.category.delete({
			where: { id: +id }
		});

	

			return 'Success';
	}

}
