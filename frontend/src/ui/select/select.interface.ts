export interface ISelectItem<K = string> {
	label: string
	key: K
}

export interface ISelect<K = string> {
	data: ISelectItem<K>[]
	onChange: (item: ISelectItem<K>) => void
	value?: ISelectItem<K>
	title?: string
}
