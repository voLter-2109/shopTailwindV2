import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ProductService } from 'src/product/product.service';
import { ReviewDto } from './review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
	constructor(
		private reviewService: ReviewService
	) {}

	@UsePipes(new ValidationPipe())
	@Get()
	@Auth('admin')
	async getAll() {
		return this.reviewService.getAll();
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('leave/:productId')
	async leaveReview(
		@Param('productId') productId: string,
		@CurrentUser('id') id: number,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.create(id, dto, +productId);
	}

	@Get('average-by-product/:productId')
	async getAAvarageByProduct(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueProductId(+productId);
	}
}
