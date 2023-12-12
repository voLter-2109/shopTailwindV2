import { Controller, Get } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { StatisticService } from './statistic.service';

@Controller('statistic')
export class StatisticController {
	constructor(private readonly statisticService: StatisticService) {}

	@Get('main')
	@Auth('admin')
	getMainStatistics() {
		return this.statisticService.getMain();
	}
}
