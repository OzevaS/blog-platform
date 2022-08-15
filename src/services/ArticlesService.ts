import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IArticle, IArticleResponse, IArticleArrayResponse } from '../types/Article';

export const articlesApi = createApi({
  reducerPath: 'articlesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    fetchAllArticles: build.query<IArticleArrayResponse, { page: number; limit: number }>({
      query: (params) => ({
        url: '/articles',
        params: { limit: params.limit, offset: (params.page - 1) * params.limit },
      }),
    }),
    fetchArticle: build.query<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
      }),
    }),
    createArticle: build.mutation<IArticleResponse, IArticle>({
      query: (params) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article: params,
        }
      }),
    }),
    editArticle: build.mutation<IArticleResponse, IArticle>({
      query: (params) => ({
        url: `/articles/${params.slug}`,
        method: 'PUT',
        body: {
          article: {
            title: params.title,
            description: params.description,
            body: params.body,
            tagList: params.tagList,
          },
        }
      }),
    }),
    deleteArticle: build.mutation<IArticleResponse, unknown>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
  }),
});
