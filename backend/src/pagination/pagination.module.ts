import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PaginationController } from './pagination.controller';
import { PaginationService } from './pagination.service';

@Module({
	controllers: [PaginationController],
	providers: [PaginationService, PrismaService],
	exports: [PaginationService]
})
export class PaginationModule {}
