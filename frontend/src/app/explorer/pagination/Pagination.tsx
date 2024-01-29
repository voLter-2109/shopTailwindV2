'use client'

import { FC } from 'react'
import ReactPaginate from 'react-paginate'

interface IPagination {
	numberPages: number
	changePage(page: number): void
	currentPage: number | string
}

const Pagination: FC<IPagination> = ({
	numberPages,
	changePage,
	currentPage
}) => {
	return (
		<div className=' w-full flex mt-5'>
			<ReactPaginate
				className='flex mx-auto '
				pageClassName='mx-2'
				activeClassName='text-primary  pointer-events-none opacity-80 w-5 text-center font-extrabold'
				nextLabel='next >'
				onClick={e => {
					changePage((e.nextSelectedPage && +e.nextSelectedPage + 1) || 1)
				}}
				forcePage={+currentPage - 1}
				pageCount={numberPages}
				previousLabel='< prev'
				renderOnZeroPageCount={null}
			/>
		</div>
	)
}

export default Pagination

// {Array.from({ length: numberPages > 1 ? numberPages : 1 }).map(
// 	(_, index) => {
// 		const pageNumber = (index + 1).toString()
// 		return (
// 			<Button
// 				key={index}
// 				size='sm'
// 				variantColor='dark'
// 				onClick={() => changePage(+pageNumber)}
// 				className='mx-3'
// 				disabled={currentPage === pageNumber}
// 			>
// 				{pageNumber}
// 			</Button>
// 		)
// 	}
// )}
