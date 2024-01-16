import Heading from '../../ui/heading/Heading'
import { FC, PropsWithChildren } from 'react'

export const revalidete = 60

const Test: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<div>
			<Heading>{'<- Выбери категорию'}</Heading>
			{children}
		</div>
	)
}

export default Test
