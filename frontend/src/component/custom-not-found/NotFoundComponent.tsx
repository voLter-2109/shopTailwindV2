'use client'

import Heading from '../../ui/heading/Heading'
import Link from 'next/link'

export default function NotFoundComponent() {
	return (
		<div className='w-full pt-20 text-center my-auto '>
			<Heading className='mb-5'>Page not Found</Heading>

			<Link
				href='/'
				className='p-2 border rounded-lg hover:shadow-2xl hover:shadow-black'
			>
				Return Home
			</Link>
		</div>
	)
}
