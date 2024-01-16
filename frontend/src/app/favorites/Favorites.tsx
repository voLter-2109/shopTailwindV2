'use client'

import Catalog from '../../component/catalog/Catalog'
import { useProfile } from '../../hooks/useProfile'
import { NextPage } from 'next'

const FavoritesPage: NextPage = () => {
	const { profile } = useProfile()

	return (
		<Catalog products={profile?.favorites || []} title='Favorites roduct' />
	)
}

export default FavoritesPage
