'use client'

import { useAuth } from '../../hooks/useAuth'
import { useIsAdminPanel } from '../../hooks/useIsAdminPanel'
import { Cart } from '../../ui/cart-product/HeaderCart'
import { HeaderProfile } from '../../ui/profile/Profile'
import Search from '../../ui/search/Search'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const Header: FC = () => {
	const [file, setFile] = useState<File | null>(null)
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

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

				// console.log(data)
			} catch (error) {
				// console.error(error)
			}
		}
	}

	return (
		<header className=' w-full shadow-2xl px-16 items-center 
		h-16 border border-y-primary flex justify-between z-20'>
			<Link
				href='/'
				style={{
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{!isAdminPanel ? (
					<Image
						unoptimized={true}
						width='0'
						height='0'
						className='w-full  bg-black rounded-3xl h-14 p-2'
						style={{ width: '45px', height: '45px' }}
						src={'/logo.svg'}
						alt='logo'
						priority={true}
					/>
				) : (
					<h2 className='text-3xl font-semibold text-black'>Admin Panel</h2>
				)}
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
				{user?.isAdmin && !isAdminPanel && (
					<Link
						href={'/admin'}
						className='text-primary transition-all 
					duration-300 hover:scale-110'
					>
						<MdOutlineAdminPanelSettings size={29} />
					</Link>
				)}
				<Link
					href='/favorites'
					className='text-primary transition-all 
					duration-300 hover:scale-110'
				>
					<AiOutlineHeart size={28} />
				</Link>
				<Cart />
				{user ? (
					<HeaderProfile />
				) : (
					<Link
						href={'/auth'}
						className='text-primary transition-all 
					duration-300 hover:scale-110'
					>
						Войти
					</Link>
				)}
			</div>
		</header>
	)
}

export default Header
