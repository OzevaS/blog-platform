import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle } from '../../types/Article';

export interface ArticleState {
  articles: IArticle[];
  isLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
}

const initialState: ArticleState = {
  articles: [],
  isLoading: false,
  error: null,
  page: 1,
  limit: 5,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export default articlesSlice.reducer;
