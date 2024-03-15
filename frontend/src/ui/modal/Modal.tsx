import style from './Modal.module.scss'
import cn from 'clsx'
import { FC, PropsWithChildren, useRef } from 'react'
import { createPortal } from 'react-dom'
import { RiCloseFill } from 'react-icons/ri'

interface IModal {
	isOpen: boolean
	closeModal: () => void
}

const Modal: FC<PropsWithChildren<IModal>> = ({
	closeModal,
	isOpen,
	children
}) => {
	const modalRef = useRef<HTMLElement | null>(document.getElementById('modal'))
	const divRef = useRef<HTMLDivElement>(null)

	const handleCloModal = (e: React.MouseEvent<Element, MouseEvent>) => {
		if (e.target && e.target === divRef.current) closeModal()
	}

	if (!isOpen || !modalRef.current) return null

	return createPortal(
		<div
			className={cn(style.overlay, 'z-50')}
			ref={divRef}
			onClick={e => handleCloModal(e)}
		>
			<div className={style.window}>
				<button onClick={closeModal}>
					<RiCloseFill />
				</button>
				{children}
			</div>
		</div>,
		modalRef.current
	)
}

export default Modal
