import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { FilesModule } from './file-upload/files.module';
import { OrderModule } from './order/order.module';
import { PaginationModule } from './pagination/pagination.module';
import { PrismaService } from './prisma.service';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { StatisticModule } from './statistic/statistic.module';
import { UserModule } from './user/user.module';

// __dirname
// C:\Users\sausa\Desktop\shopfullstack\backend\dist\src
// import { path } from 'app-root-path';
// C:\Users\sausa\Desktop\shopfullstack\backend

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
		MulterModule.register({
			dest: './uploads'
		}),
		FilesModule,
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ProductModule,
		ReviewModule,
		CategoryModule,
		OrderModule,
		StatisticModule,
		PaginationModule
	],
	controllers: [AuthController],
	providers: [PrismaService]
})
export class AppModule {}
