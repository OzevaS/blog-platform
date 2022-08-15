import { configureStore, combineReducers } from '@reduxjs/toolkit';

import articlesApi from '../services/ArticlesService';

import userReducer from './reducers/UserSlice';
import articlesReducer from './reducers/ArticlesSlice';

const rootReducer = combineReducers({
  userReducer,
  articlesReducer,
  [articlesApi.reducerPath]: articlesApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
