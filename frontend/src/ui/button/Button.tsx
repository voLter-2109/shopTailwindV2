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
				'rounded-xl px-10 py-2 font-medium shadow hover:shadow-2xl transition duration-300 ease-in-out',
				{
					'bg-primary text-white': variantColor == 'dark',
					'bg-white text-primary': variantColor == 'light',
					'px-5 py-2 text-sm': size === 'sm',
					'px-12 py-4 text-xle': size === 'lg'
				},
				className
			)}
		>
			<span>{children}</span>
		</button>
	)
}

export default Button
