import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
	persistReducer,
	persistStore
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cartSlice } from './cart/cart.slice'
import { userSlice } from './user/user.slice'

// const persistConfig = {
// 	key: 'root',
// 	storage,
// 	whitelist: ['cart']
// }
const persistConfig = {
	key: 'root',
	storage
}

// const isClient = typeof window !== 'undefined'
// if (isClient) {
// 	console.log('isClient')
// }

const rootReducer = combineReducers({
	// cart: cartSlice.reducer,
	// carousel: carouselSlice.reducer,
	user: userSlice.reducer,
	cart: cartSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			// serializableCheck: false
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)
// const makeStore = () => store
export type TypeRootState = ReturnType<typeof rootReducer>

// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import {
// 	FLUSH,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER,
// 	REHYDRATE,
// 	persistStore
// } from 'redux-persist'
// import { cartSlice } from './cart/cart.slice'
// import { userSlice } from './user/user.slice'
// //!

// const isClient = typeof window !== 'undefined'

// const combinedReducers = combineReducers({
// 	user: userSlice.reducer,
// 	cart: cartSlice.reducer
// })

// let mainReducer = combinedReducers

// if (isClient) {
// 	const { persistReducer } = require('redux-persist')
// 	const storage = require('redux-persist/lib/storage')

// 	const persistConfig = {
// 		key: 'root',
// 		storage
// 	}

// 	mainReducer = persistReducer(persistConfig, combinedReducers)
// }

// export const store = configureStore({
// 	reducer: mainReducer,
// 	middleware: getDefaultMiddleware =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
// 			}
// 		})
// })

// export const persistor = persistStore(store)

// export type TypeRootState = ReturnType<typeof mainReducer>
