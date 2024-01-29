import { useOutside } from '../../hooks/useOutside'
import { ISelect } from './select.interface'
import style from './select.module.scss'
import cn from 'clsx'
import { useState } from 'react'
import { Fade } from 'react-awesome-reveal'
import { BsCaretDownFill } from 'react-icons/bs'

function Select<K>({ data, onChange, value, title }: ISelect) {

	const { isShow, ref, setIsShow } = useOutside(false)

	return (
		<div ref={ref} className={style.select}>
			<button onClick={() => setIsShow(!isShow)}>
				{title && <b>{title}</b>}
				{value?.label || 'Default'}
				<BsCaretDownFill />
			</button>

			{isShow && (
				<Fade cascade damping={0.1}>
					<ul>
						{data.map(item => (
							<li
								key={item.key?.toString()}
								className={cn({ [style.active]: item.key === value?.key })}
							>
								<button
									onClick={() => {
										onChange(item)
										setIsShow(false)
									}}
									disabled={item.key === value?.key}
								>
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</Fade>
			)}
		</div>
	)
}

export default Select
