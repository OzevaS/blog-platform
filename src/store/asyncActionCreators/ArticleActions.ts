import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApiInstance from '../../axiosApiInstance';
import { IArticleResponse } from '../../types/Article';

export const createArticle = createAsyncThunk('articles/create', async (params: any, thunkAPI) => {
  try {
    const response = await axiosApiInstance.post<IArticleResponse>('/articles', {
      article: {
        ...params,
      },
    });
    return response.data.article;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const editArticle = createAsyncThunk('articles/edit', async (params: any, thunkAPI) => {
  try {
    const response = await axiosApiInstance.put<IArticleResponse>('/articles', {
      article: {
        ...params,
      },
    });
    return response.data.article;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});

export const deleteArticle = createAsyncThunk('articles/delete', async (slug: string, thunkAPI) => {
  try {
    console.log('slug', slug);
    const response = await axiosApiInstance.delete<IArticleResponse>(`/articles/${slug}`);
    return true;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.errors);
  }
});
