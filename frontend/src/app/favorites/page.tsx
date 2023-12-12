'use client'

import { NextPage } from 'next'
import Catalog from '../../component/catalog/Catalog'
import { useProfile } from '../../hooks/useProfile'

const FavoritesPage: NextPage = () => {
	const { profile } = useProfile()

	return <Catalog products={profile?.favorites || []} />
}

export default FavoritesPage
