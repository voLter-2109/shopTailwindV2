import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from 'src/product/product.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, PrismaService],
	exports: [CategoryService],
	imports: [forwardRef(() => ProductModule)],
})
export class CategoryModule {}
