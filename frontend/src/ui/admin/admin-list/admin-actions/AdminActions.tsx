import Modal from '../../../modal/Modal'
import { IAdminActions } from '../admin-list.interface'
import style from './AdminActions.module.scss'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { RiDeleteRow, RiEdit2Line, RiExternalLinkLine } from 'react-icons/ri'

const AdminActions: FC<IAdminActions> = ({
	editUrl,
	removeHandler,
	viewUrl
}) => {
	const { push } = useRouter()
	const [isOpenModal, setIsModalOpen] = useState(false)

	return (
		<div className={style.actions}>
			{viewUrl && (
				<button onClick={() => push(viewUrl)} title='view product'>
					<RiExternalLinkLine />
				</button>
			)}
			{editUrl && (
				<button onClick={() => push(editUrl)} title='edit product'>
					<RiEdit2Line />
				</button>
			)}
			{removeHandler && (
				<button onClick={() => setIsModalOpen(true)} title='delete product'>
					<RiDeleteRow />
				</button>
			)}
			<Modal closeModal={() => setIsModalOpen(false)} isOpen={isOpenModal}>
				123
			</Modal>
		</div>
	)
}

export default AdminActions
