'use client'

import { useActions } from '../../hooks/useActions'
import { NextPage } from 'next'
import { useEffect } from 'react'

const Thanks: NextPage = () => {
	const { reset } = useActions()

	useEffect(() => {
		reset()
	}, [])

	return (
		<div className='h-full w-full flex justify-center items-center'>
			<h1 className='text-3xl'>Thanks</h1>
		</div>
	)
}

export default Thanks
