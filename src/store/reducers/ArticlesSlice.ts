import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticle, IArticleError } from '../../types/Article';
import { createArticle , deleteArticle, editArticle } from '../asyncActionCreators/ArticleActions';


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
  extraReducers: {
    [createArticle.fulfilled.type]: (state, action: PayloadAction<IArticle>) => {
      state.create.article = action.payload;
      state.create.isLoading = false;
      state.create.error = null;
    },
    [createArticle.rejected.type]: (state, action: PayloadAction<IArticleError>) => {
      state.create.error = action.payload;
      state.create.isLoading = false;
    },

    [editArticle.fulfilled.type]: (state) => {
      state.create.isLoading = false;
    },
    [editArticle.rejected.type]: (state, action: PayloadAction<IArticleError>) => {
      state.create.error = action.payload;
      state.create.isLoading = false;
    },

    [deleteArticle.fulfilled.type]: (state) => {
      state.create.isLoading = false;
    },
    [deleteArticle.rejected.type]: (state, action: PayloadAction<IArticleError>) => {
      state.create.error = action.payload;
      state.create.isLoading = false;
    },
  },
});

export default articlesSlice.reducer;
