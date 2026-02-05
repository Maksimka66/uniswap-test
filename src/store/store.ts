import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import keyReducer from './slice'

const persistConfig = {
    key: 'userKey',
    storage,
    whitelist: ['key']
}

const keyPersistedReduser = persistReducer(persistConfig, keyReducer)

export const store = configureStore({
    reducer: {
        key: keyPersistedReduser
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)

