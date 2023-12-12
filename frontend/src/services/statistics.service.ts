import instanse from '../api/api.interceptor'
import { IStatisticResponse } from '../types/statistics.interface'

const STATISTIC = '/statistic'

const StatisticService = {
	async getMain() {
		return instanse<IStatisticResponse[]>({
			method: 'GET',
			url: `${STATISTIC}/main`
		})
	}
}

export default StatisticService
