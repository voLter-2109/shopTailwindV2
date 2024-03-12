import { ADMIN_PANEL_URL } from '../config/url.config'
import { usePathname } from 'next/navigation'

export const useIsAdminPanel = () => {
	const pathname = usePathname()
	const isAdminPanel = pathname.startsWith(ADMIN_PANEL_URL)

	return { pathname, isAdminPanel }
}
