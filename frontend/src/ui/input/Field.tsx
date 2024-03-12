import { IField } from './feild.interface'
import cn from 'clsx'
import { forwardRef } from 'react'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, type = 'text', className, Icon, style, ...rest },
		ref
	) => {
		return (
			<div className={cn('mb-4', className)} style={style}>
				<label>
					<span className='md-2 block w-full text-center'>
						{/* {Icon && <Icon className='mr-3' />} */}
						{Icon && <img src={Icon} className='h-6 m-0 float-left' />}
						{placeholder}
					</span>
					<input
						placeholder={placeholder}
						className={cn(
							'px-4 w-full outline-none border rounded-lg border-gray border-solid focus:border-primary   transition-all'
						)}
						type={type}
						ref={ref}
						{...rest}
					/>
				</label>
				{error && (
					<div className='text-red-500 font-bold mt-1 w-full text-center'>
						{error}
					</div>
				)}
			</div>
		)
	}
)

export default Field
