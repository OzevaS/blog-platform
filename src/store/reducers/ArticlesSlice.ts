import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle, IArticleError } from '../../types/Article';

export interface ArticleState {
  articles: {
    isLoading: boolean;
    error: IArticleError | null;
    page: number;
    limit: number;
  };
  create: {
    article: IArticle | null;
    isLoading: boolean;
    error: IArticleError | null;
  };
  edit: {
    article: IArticle | null;
    isLoading: boolean;
    error: IArticleError | null;
  };
  delete: {
    article: IArticle | null;
    isLoading: boolean;
    error: IArticleError | null;
  };
}

const initialState: ArticleState = {
  articles: {
    isLoading: false,
    error: null,
    page: 1,
    limit: 5,
  },
  create: {
    article: null,
    isLoading: false,
    error: null,
  },
  edit: {
    article: null,
    isLoading: false,
    error: null,
  },
  delete: {
    article: null,
    isLoading: false,
    error: null,
  },
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.articles.page = action.payload;
    },
  },
});

export default articlesSlice.reducer;
