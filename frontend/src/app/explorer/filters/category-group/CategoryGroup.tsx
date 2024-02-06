import { useCategory } from '../../../../hooks/useCategory'
import CheckBox from '../../../../ui/filter/checkbox/CheckBox'
import Loader from '../../../../ui/loader/Loader'
import FilterWrapper from '../FilterWrapper'
import { useFilters } from 'explorer/useFilters'
import { FC } from 'react'

const CategoryGroup: FC = () => {
	const { queryParams, updateQueryParams } = useFilters()
	const { data, isLoading } = useCategory()

	// console.log(data)

	return (
		<FilterWrapper title='Category'>
			{!isLoading ? (
				<Loader />
			) : data?.length ? (
				data.map(category => {
					const isChecked = queryParams.categoryId === category.id.toString()
					return (
						<CheckBox
							isChecked={isChecked}
							onClick={() =>
								updateQueryParams(
									'categoryId',
									isChecked ? '' : category.id.toString()
								)
							}
							key={category.id}
							className='mb-2 text-sm'
						>
							{category.name}
						</CheckBox>
					)
				})
			) : (
				<p>Category not found</p>
			)}
		</FilterWrapper>
	)
}

export default CategoryGroup
