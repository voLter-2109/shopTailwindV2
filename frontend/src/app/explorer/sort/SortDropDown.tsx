import { EnumProductSort } from '../../../types/product.interface'
import Select from '../../../ui/select/Select'
import { SORT_SELECT_DATA } from './sort-select'
import { useFilters } from 'explorer/useFilters'

const SortDropDown = () => {
	const { queryParams, updateQueryParams } = useFilters()

	return (
		<div className='text-right z-20'>
			<Select<EnumProductSort>
				data={SORT_SELECT_DATA}
				onChange={value => {
					updateQueryParams('page', '1')
					updateQueryParams('sort', value.key.toString())
				}}
				value={SORT_SELECT_DATA.find(value => value.key === queryParams.sort)}
				title='sort by'
			/>
		</div>
	)
}

export default SortDropDown
