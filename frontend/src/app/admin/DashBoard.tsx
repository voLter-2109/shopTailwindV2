'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import CustomLoading from '../../component/custom-loading/CustomLoading'
import StatisticService from '../../services/statistics.service'
import Heading from '../../ui/heading/Heading'
import { convertPrice } from '../../utils/convertPrice'
import style from './DashBouard.module.scss'
import cn from "clsx"

const DashBoard: FC = () => {
	const { data, isFetching } = useQuery(
		['statistics'],
		() => StatisticService.getMain(),
		{
			select: ({ data }) => data
		}
	)
	return (
		<>
			<Heading className='mb-8'>DashBoard</Heading>
			{isFetching ? (
				<CustomLoading />
			) : data?.length ? (
				<div className={style.wrapper}>
					{data.map((item, index) => (
						<div className={cn(style.item, "shadow-lg")} key={item.name}>
							<div className='font-bold'>{item.name}:</div>
							<div>
								{index === data.length - 1
									? convertPrice(item.value || 0)
									: item.value}
							</div>
						</div>
					))}
				</div>
			) : (
				<div>Statistic not loaded</div>
			)}
		</>
	)
}

export default DashBoard
