import Checkbox from '../../../../ui/filter/checkbox/CheckBox'
import FilterWrapper from '../FilterWrapper'
import { RATINGS_VARIANTS } from './raiting-variants.data'
import { useFilters } from 'explorer/useFilters'
import { FC } from 'react'
import { Rating } from 'react-simple-star-rating'

const RaitingGroup: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<FilterWrapper title='Number of reviews'>
			{RATINGS_VARIANTS.map(rating => (
				<Checkbox
					isChecked={queryParams.ratings?.includes(rating.toString()) || false}
					onClick={() => {
						if (queryParams.ratings === rating.toString())
							updateQueryParams('ratings', '')
						else updateQueryParams('ratings', rating.toString())
					}}
					key={rating}
					className='mb-2 text-sm'
				>
					<Rating
						readonly
						initialValue={rating}
						SVGstyle={{
							display: 'inline-block'
						}}
						size={20}
						transition
					/>
				</Checkbox>
			))}
		</FilterWrapper>
	)
}

export default RaitingGroup
