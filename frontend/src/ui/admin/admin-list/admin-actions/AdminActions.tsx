import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { RiDeleteRow, RiEdit2Line, RiExternalLinkLine } from 'react-icons/ri'
import { IAdminActions } from '../admin-list.interface'
import style from './AdminActions.module.scss'

const AdminActions: FC<IAdminActions> = ({
	editUrl,
	removeHandler,
	viewUrl
}) => {
	const { push } = useRouter()

	return (
		<div className={style.actions}>
			{viewUrl && (
				<button onClick={() => push(viewUrl)}>
					<RiExternalLinkLine />
				</button>
			)}
			{editUrl && (
				<button onClick={() => push(editUrl)}>
					<RiEdit2Line />
				</button>
			)}
			{removeHandler && (
				<button onClick={removeHandler}>
					<RiDeleteRow />
				</button>
			)}
		</div>
	)
}

export default AdminActions
