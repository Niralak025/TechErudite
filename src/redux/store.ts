import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import favouritesReducer from './slices/favouritesSlice';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['user'], // strictly only persist user data
};

const favouritesPersistConfig = {
  key: 'favourites',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  ui: uiReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  favourites: persistReducer(favouritesPersistConfig, favouritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
