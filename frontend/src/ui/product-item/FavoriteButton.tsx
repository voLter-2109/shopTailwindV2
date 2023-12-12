import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import UserService from '../../services/user.service'
import { IFullUser } from '../../types/user.interface'

const FavoriteButton: FC<{ productId: number; profile: IFullUser }> = ({
	productId,
	profile
}) => {
	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		['toggle favorite'],
		() => UserService.toggleFavorite(productId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['getProfile'])
			}
		}
	)
	const checkProfile = Object.keys(profile)

	if (!checkProfile.length) return null

	const isExists = profile.favorites.some(f => f.id === productId)

	return (
		<div>
			<button className='text-red-600' onClick={() => mutate()}>
				{isExists ? (
					<AiFillHeart size='20px' />
				) : (
					<AiOutlineHeart size='20px' />
				)}
			</button>
		</div>
	)
}

export default FavoriteButton
