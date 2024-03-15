import { IProductResponse } from '../../types/product.interface'
import { convertPrice } from '../../utils/convertPrice'
import style from './Checkout.module.scss'
import Image from 'next/image'
import { FC } from 'react'

const CkeckOutItem: FC<{ product: IProductResponse }> = ({ product }) => {
	return (
		<div className={style.item}>
			<Image
				src={product.image[0]}
				width={100}
				height={100}
				alt={product.name}
			/>
			<div className={style.row}>
				<div className={style.information}>
					<div>{product.name}</div>
					<div>{product.category.name}</div>
				</div>
				<div className={style.price}>{convertPrice(product.price)}</div>
			</div>
		</div>
	)
}

export default CkeckOutItem
