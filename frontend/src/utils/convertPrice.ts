export const convertPrice = (price: number) => {
	return new Intl.NumberFormat('ru-RU').format(price) + "💲"
}
