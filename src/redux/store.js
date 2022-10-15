import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { rootPersistConfig, rootReducer } from './rootReducer';

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => {
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    });
  },
});

const persistor = persistStore(store);
