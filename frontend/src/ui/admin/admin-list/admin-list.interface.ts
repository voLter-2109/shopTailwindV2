export interface IListItem {
	id: number
	editUrl?: string
	viewUrl?: string
	items: string[]
}

export interface IAdminListItem {
	listItem: IListItem
	removeHandler?: () => void
}

export interface AdminList {
	listItems?: IListItem[]
	isLoading: boolean
	removeHandler?: (id:number) => void
}

export interface IAdminActions extends Pick<IListItem, 'editUrl' | 'viewUrl'> {
	removeHandler?: () => void
}
