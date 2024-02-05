import Range from '../../../../ui/filter/range/Range'
import FilterWrapper from '../FilterWrapper'
import { useFilters } from 'explorer/useFilters'
import { FC } from 'react'

const PriceGroup: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()
	return (
		<FilterWrapper title='Price from\to'>
			<Range
				min={0}
				max={2000}
				fromInitialValue={queryParams.minPrice}
				toInitialValue={queryParams.maxPrice}
				onChangeFromValue={value => updateQueryParams('minPrice', value)}
				onChangeToValue={value => updateQueryParams('maxPrice', value)}
			/>
		</FilterWrapper>
	)
}

export default PriceGroup
