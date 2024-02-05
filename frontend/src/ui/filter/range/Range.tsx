import { useDebounce } from '../../../hooks/useDebounce'
import style from './Range.module.scss'
import { FC, useEffect, useState } from 'react'

interface IRange {
	min?: number
	max?: number
	fromInitialValue?: string
	toInitialValue?: string
	onChangeFromValue: (value: string) => void
	onChangeToValue: (value: string) => void
}

const Range: FC<IRange> = ({
	onChangeFromValue,
	onChangeToValue,
	fromInitialValue,
	toInitialValue,
	max,
	min
}) => {
	const [fromValue, setFromValue] = useState(fromInitialValue || '')
	const [toValue, setToValue] = useState(toInitialValue || '')

	const debounceFromValue = useDebounce(fromValue, 500)
	const debounceToValue = useDebounce(toValue, 500)

	useEffect(() => {
		onChangeFromValue(debounceFromValue)
	}, [debounceFromValue])
	useEffect(() => {
		onChangeToValue(debounceToValue)
	}, [debounceToValue])

	return (
		<div className={style.range}>
			<input
				min={min}
				max={max}
				placeholder='From'
				value={fromValue}
				onChange={e => setFromValue(e.target.value)}
			/>
			{' - '}
			<input
				min={min}
				max={max}
				placeholder='To'
				value={toValue}
				onChange={e => setToValue(e.target.value)}
			/>
		</div>
	)
}

export default Range
