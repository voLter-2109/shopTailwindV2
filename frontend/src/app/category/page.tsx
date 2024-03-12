import Heading from '../../ui/heading/Heading'
import { FC, PropsWithChildren } from 'react'

const Test: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div>
			<Heading>{'<- Выбери категорию'}</Heading>
			{children}
		</div>
	)
}

export default Test
