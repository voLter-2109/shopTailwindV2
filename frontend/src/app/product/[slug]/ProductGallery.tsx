import cn from 'clsx'
import Image from 'next/image'
import { FC, useState } from 'react'

interface IProductGalary {
	image: string[]
}

const ProductGallery: FC<IProductGalary> = ({ image }) => {
	const [activeIndex, setActiveIndex] = useState(0)

	return (
		<div>
			<Image
				src={image[activeIndex]}
				alt=''
				width={500}
				height={500}
				className='rounded-lg overflow-hidden'
				priority
				draggable='false'
			/>
			<div className='mt-6 w-[500px] overflow-x-auto whitespace-nowrap'>
				{image.map((image, index) => (
					<button
						key={index}
						onClick={() => setActiveIndex(index)}
						className={cn(
							'duration-300 hover:shadow-xl mr-5 last:mr-0 border-b-2',
							'border-solid transition-all rounded-lg overflow-hidden inline-block',
							{
								'shadow-mb border-primary': index === activeIndex,
								'border-transparent': index !== activeIndex
							}
						)}
					>
						<Image
							draggable={false}
							src={image}
							alt=''
							width={100}
							height={100}
							priority
						/>
					</button>
				))}
			</div>
		</div>
	)
}

export default ProductGallery
