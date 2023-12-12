import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
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
			serializableCheck: false
			// serializableCheck: {
			// 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			// }
		})
})

export const persistor = persistStore(store)
// const makeStore = () => store
export type TypeRootState = ReturnType<typeof rootReducer>

// export const wrapper = createWrapper<Store<TypeRootState>>(makeStore)

// import { configureStore } from '@reduxjs/toolkit'
// import { combineReducers } from 'redux'

// import { persistStore } from 'redux-persist'
// import { cartSlice } from './cart/cart.slice'
// import { userSlice } from './user/user.slice'

// // const persistConfig = {
// // 	key: 'root',
// // 	storage,
// // 	whitelist: ['cart']
// // }

// const isClient = typeof window !== 'undefined'

// const combinedReducers = combineReducers({
// 	// cart: cartSlice.reducer,
// 	// carousel: carouselSlice.reducer,
// 	user: userSlice.reducer,
// 	cart: cartSlice.reducer
// })

// let mainReducer = combinedReducers

// if (isClient) {
// 	const { persistReducer, persistStore } = require('redux-persist')
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
// 			serializableCheck: false
// 			// serializableCheck: {
// 			// 	ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
// 			// }
// 		})
// })

// export const persistor = persistStore(store)

// export type TypeRootState = ReturnType<typeof mainReducer>
