'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { Cart } from '../../ui/cart-product/HeaderCart'
import { HeaderProfile } from '../../ui/profile/Profile'
import Search from '../../ui/search/Search'

const Header: FC = () => {
	const [file, setFile] = useState<File | null>(null)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFile(e.target.files[0])
		}
	}

	const handleUpload = async () => {
		if (file) {
			console.log('Uploading file...')

			const formData = new FormData()
			formData.append('image', file)

			try {
				// You can write the URL of your server or any other endpoint used for file upload
				const result = await fetch('http://localhost:4200/api/files', {
					method: 'POST',
					body: formData
				})

				const data = await result.json()

				console.log(data)
			} catch (error) {
				console.error(error)
			}
		}
	}

	return (
		<header
			className='bg-secondary w-full p-6 h-20 border grid'
			style={{
				gridTemplateColumns: '1fr 3fr 1fr',
				padding: '1.5rem',
				height: '80px'
			}}
		>
			<Link
				href='/'
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				<Image
					unoptimized={true}
					width='0'
					height='0'
					className='w-full h-auto'
					style={{ width: '45px', height: '45px' }}
					src={'/logo.svg'}
					alt='logo'
					priority={true}
				/>
			</Link>
			<Search />
			{/* <form>
				<input
					placeholder='file loader'
					className={cn(
						'px-4 w-full outline-none border rounded-lg border-gray border-solid focus:border-primary   transition-all'
					)}
					type='file'
					onChange={handleFileChange}
				/>
				<button
					type='submit'
					onClick={e => {
						e.preventDefault()
						handleUpload()
					}}
				>
					sent
				</button>
			</form> */}
			<div
				className='flex items-center justify-end gap-10'
				style={{ justifyContent: 'space-around' }}
			>
				<Link href='/favorites' className='text-white'>
					<AiOutlineHeart size={28} />
				</Link>
				<Cart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
