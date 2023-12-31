import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '../store/store'
import ReduxProvider from './ReduxProvider'
import AuthProvider from './auth-provider/AuthProvider'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnMount: false,
			staleTime: 1000 * 60 * 10 // 10 minutes
		}
	}
})

export default function Providers({ children }: PropsWithChildren<unknown>) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<PersistGate loading={null} persistor={persistor}>
				<ReduxProvider>
					{/* <span>Provider</span> */}
					<AuthProvider>{children}</AuthProvider>
				</ReduxProvider>
			</PersistGate>
		</QueryClientProvider>
	)
}
