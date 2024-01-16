'use client'

import { NextPage } from 'next'
import { useOrder } from '../../hooks/useOrder'
import { IOrderResponse } from '../../types/order.intervace'
import Heading from '../../ui/heading/Heading'
import { convertPrice } from '../../utils/convertPrice'

const OrderPage: NextPage = () => {
	const { orders } = useOrder()

	return (
		<>
			<Heading className='mb-5'>My orders</Heading>
			<section className='relative overflow-x-auto shadow-md sm:rounded-lg'>
				<table className='w-full text-sm text-left text-gray-500 '>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
						<tr>
							<th scope='col' className='px-6 py-3'>
								id
							</th>
							<th scope='col' className='px-6 py-3'>
								status
							</th>
							<th scope='col' className='px-6 py-3'>
								total
							</th>
							<th scope='col' className='px-6 py-3'>
								create at
							</th>
						</tr>
					</thead>
					<tbody>
						{orders && orders?.length ? (
							orders.map((order: IOrderResponse) => {
								return (
									<tr key={order.id} className='bg-white  border-b '>
										<th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
											#{order.id}
										</th>
										<td>{order.status}</td>
										<td>{convertPrice(order.total)}</td>
										<td>{new Date(order.createdAt).toLocaleString()}</td>
									</tr>
								)
							})
						) : (
							<tr>
								<td>no order</td>
							</tr>
						)}
					</tbody>
				</table>
			</section>
		</>
	)
}

export default OrderPage
