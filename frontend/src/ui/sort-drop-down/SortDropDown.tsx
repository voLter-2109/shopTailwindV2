import { Dispatch, FC, SetStateAction } from 'react'
import { EnumProductSort } from '../../types/product.interface'

interface ISortDropdown {
	sortType: EnumProductSort
	setSortType: Dispatch<SetStateAction<EnumProductSort>>
	setPage: Dispatch<SetStateAction<number>>
}

const SortDropDown: FC<ISortDropdown> = ({
	setSortType,
	sortType,
	setPage
}) => {
	return (
		<div className='text-right mb-2'>
			<select
				value={sortType}
				onChange={e => {
					setSortType(e.target.value as any)
					setPage(1)
				}}
			>
				{(
					Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
				).map(key => {
					return (
						<option
							key={key}
							onChange={() => {
								setSortType(EnumProductSort[key])
							}}
							value={EnumProductSort[key]}
						>
							{EnumProductSort[key]}
						</option>
					)
				})}
			</select>
		</div>
	)
}

export default SortDropDown
