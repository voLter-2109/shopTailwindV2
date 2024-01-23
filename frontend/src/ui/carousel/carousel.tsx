'use client'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ICarouselItem } from './corousel.interface'
import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

interface ICarousel {
	items: ICarouselItem[]
	className?: string
}

const Carousel: FC<ICarousel> = ({ items, className = '' }) => {
	const { selectedItemIndex } = useTypedSelector(state => state.carousel)
	const selectedIndex = items[selectedItemIndex]

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 15000,
		arrows: false,
		hover: true
	}

	return (
		<section className={cn(className, 'mb-8 ')}>
			<Slider {...settings} className=''>
				{items.map((item, i) => {
					return (
						<div
							key={i}
							className=' shadow-sm overflow-hidden rounded-lg p-4  '
						>
							<div className='flex'>
								<div className='flex w-[50%] flex-col gap-3 '>
									<h2>{item.title}</h2>
									<p>{item.description}</p>
									{item.link ? (
										<Link href={item.link} className='btn btn-white'>
											Read more
										</Link>
									) : (
										<Link href='/explorer' className='btn btn-white'>
											Brouser Product
										</Link>
									)}
								</div>
								<div className='w-[50%] relative'>
									<div
										className='h-[200%] absolute -top-1/2 -left-1/2 w-[200%]'
										style={{
											backgroundImage: `url(${item.image ? item.image : ''})`,
											backgroundRepeat: 'no-repeat',
											backgroundPosition: 'center center',
											backgroundSize: 'contain'
										}}
									></div>
								</div>
							</div>
						</div>
					)
				})}
			</Slider>
		</section>
	)
}

export default Carousel
