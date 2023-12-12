'use client'

import { usePathname } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const Test: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const pathname = usePathname()
	// console.log(pathname)

	return (
		<div>
			<span>hellow 2</span>
			{children}
		</div>
	)
}

export default Test
