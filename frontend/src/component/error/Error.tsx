'use client'

import Button from '../../ui/button/Button'
import Heading from '../../ui/heading/Heading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ErrorComponent() {
	const { back, refresh } = useRouter()
	return (
		<div className='w-full h-full text-center mt-20'>
			<Heading className=' mb-20'>Что то пошло не так...</Heading>
			<div className=' flex flex-col items-center gap-7'>
				<Button variantColor='dark' type='button' onClick={() => back()}>
					go back
				</Button>
				<Button variantColor='dark'>
					<Link href={'/'}>go home?</Link>
				</Button>
				<Button variantColor='dark' type='button' onClick={() => refresh()}>
					refresh
				</Button>
			</div>
		</div>
	)
}
