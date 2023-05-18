import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { persistReducer, persistStore } from 'redux-persist';

import userReducer from './userSlice';
import authReducer from './authSlice';
import genreReducer from './genreSlice';
import authorReducer from './authorSlice';
import comicReducer from './comicSlice';
import chapterReducer from './chapterSlice';
import followReducer from './followSlice';
import historyReducer from './historySlice';
import commentReducer from './commentSlice';
import notificationReducer from './notificationSlice';

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn', 'token', 'role'],
};

const store = configureStore({
    reducer: {
        auth: persistReducer(authConfig, authReducer),
        user: userReducer,
        genre: genreReducer,
        author: authorReducer,
        comic: comicReducer,
        chapter: chapterReducer,
        follow: followReducer,
        history: historyReducer,
        comment: commentReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
const persistor = persistStore(store);

export { store, persistor };
