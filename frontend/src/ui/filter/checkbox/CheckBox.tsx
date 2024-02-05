import styles from './CheckBox.module.scss'
import cn from 'clsx'
import { FC, PropsWithChildren } from 'react'

interface ICheckBox {
	isChecked: boolean
	onClick: () => void
	className?: string
}

const Checkbox: FC<PropsWithChildren<ICheckBox>> = ({
	isChecked,
	onClick,
	className,
	children
}) => {
	return (
		<button
			className={cn(styles.checkbox, className)}
			onClick={() => {
				onClick()
			}}
		>
			<span className={cn(isChecked && styles.active)}></span>
			<span>{children}</span>
		</button>
	)
}

export default Checkbox
