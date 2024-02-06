'use client'

import { useActions } from '../../hooks/useActions'
import Button from '../../ui/button/Button'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect } from 'react'

const Thanks: NextPage = () => {
	const { reset } = useActions()

	useEffect(() => {
		reset()
	}, [])

	return (
		<div className='h-full w-full flex flex-col justify-center items-center'>
			<h1 className='text-3xl mb-5'>Thanks</h1>
			<Button variantColor='dark'>
				<Link href='/'>go Home</Link>
			</Button>
		</div>
	)
}

export default Thanks
