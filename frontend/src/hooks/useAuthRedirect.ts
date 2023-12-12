import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

const useAuthRedirect = () => {
	const { user } = useAuth()
	const { replace } = useRouter()

	useEffect(() => {
		if (user) {
			replace('/')
		}
	}, [user])
}

export default useAuthRedirect
