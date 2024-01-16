import cn from 'clsx'
import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	variantColor: 'dark' | 'light'
}

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	variantColor,
	...rest
}) => {
	// console.log(className)
	return (
		<button
			{...rest}
			className={cn(
				'hover:scale-110 transition-all 0.3s',
				'rounded-2xl font-semibold shadow-md px-12 py-2  text-center',
				{
					'text-secondary bg-primary': variantColor == 'dark',
					'text-primary bg-white': variantColor == 'light'
				},
				className
			)}
		>
			<span>{children}</span>
		</button>
	)
}

export default Button
