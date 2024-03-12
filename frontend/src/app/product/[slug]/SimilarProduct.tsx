import { IProductResponse } from '../../../types/product.interface'
import { IFullUser } from '../../../types/user.interface'
import Heading from '../../../ui/heading/Heading'
import ProducItem from '../../../ui/product-item/ProductItem'
import { FC } from 'react'

interface ISimilarProducts {
	similarProduct: IProductResponse[]
	profile: IFullUser
}

const SimilarProduct: FC<ISimilarProducts> = ({ similarProduct, profile }) => {
	return (
		<div className='mt-20'>
			<Heading className='mb-7'>Similar products</Heading>
			{similarProduct.length ? (
				<div className='flex gap-10'>
					{similarProduct.map(product => (
						<ProducItem product={product} profile={profile} key={product.id} />
					))}
				</div>
			) : null}
		</div>
	)
}

export default SimilarProduct
