'use client'

import NotFound from '../../app/[...not-found]/page'
import { ADMIN_PANEL_URL } from '../../config/url.config'
import { REFRESH_TOKEN } from '../../constant/token.constants'
import { useActions } from '../../hooks/useActions'
import { useAuth } from '../../hooks/useAuth'
import { getAccessToken } from '../../services/auth/auth.helper'
import { protectedRouters } from './protected-routers'
import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()

		if (accessToken && user) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get(REFRESH_TOKEN)
		if (!refreshToken && user) {
			logout()
		}
	}, [pathname])

	const isProtectedRouter = protectedRouters.some(
		router => pathname?.startsWith(router)
	)

	const isAdminRouter = pathname?.startsWith(ADMIN_PANEL_URL)

	if (!isProtectedRouter && !isAdminRouter) return <>{children}</>

	if (user?.isAdmin) return <>{children}</>

	if (user && isProtectedRouter) return <>{children}</>

	// авторизирован и роут только для admin
	if (user && isAdminRouter) return <NotFound />

	if (pathname !== '/auth') router.replace('/auth')
	return null
}

export default AuthProvider
