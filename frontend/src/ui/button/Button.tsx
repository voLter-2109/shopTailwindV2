import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variantColor: 'dark' | 'light'
	size?: 'sm' | 'md' | 'lg'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variantColor,
	size = 'md',
	...rest
}) => {
	// console.log(className)
	return (
		<button
			{...rest}
			className={cn(
				'btn',
				{
					'btn-black': variantColor == 'dark',
					'btn-light': variantColor == 'light',
					'px-5 py-2 text-sm': size === 'sm',
					'btn-large': size === 'lg'
				},
				className
			)}
		>
			<span>{children}</span>
		</button>
	)
}

export default Button
