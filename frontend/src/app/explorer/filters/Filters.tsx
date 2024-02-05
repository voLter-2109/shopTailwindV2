import CategoryGroup from './category-group/CategoryGroup'
import PriceGroup from './price-group/PriceGroup'
import RaitingGroup from './raitings-group/RaitingGroup'
import { FC } from 'react'

const Filters: FC = () => {
	return (
		<div>
			<PriceGroup />
			<CategoryGroup />
			<RaitingGroup />
		</div>
	)
}

export default Filters
