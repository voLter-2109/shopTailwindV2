'use client'

import { FC } from 'react'
import CustomLoading from '../../../component/custom-loading/CustomLoading'
import AdminListItem from './AdminListItes'
import { AdminList } from './admin-list.interface'

const AdminList: FC<AdminList> = ({
    listItems = [],
    isLoading,
    removeHandler
}) => {
    return (
        <div>
            {!isLoading ? (
                <CustomLoading />
            ) : listItems?.length ? (
                listItems.map(listItem => (
                    <AdminListItem
                        key={listItem.id}
                        listItem={listItem}
                        removeHandler={
                            removeHandler ? () => removeHandler(listItem.id) : undefined
                        }
                    />
                ))
            ) : (
                <h2>end</h2>
            )}
        </div>
    )
}

export default AdminList

