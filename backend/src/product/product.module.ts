import { Module, forwardRef } from '@nestjs/common';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma.service';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
	controllers: [ProductController],
	providers: [
		ProductService,
		PrismaService,
		PaginationService,
		CategoryService
	],
	exports:[ProductService],
	imports: [forwardRef(() =>CategoryModule),
		 PaginationModule]
})
export class ProductModule {}
