import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { IArticle, IArticleArrayResponse, IArticleResponse } from '../types/Article';

import { baseQuery } from './settings';

const articlesApi = createApi({
  reducerPath: 'articlesAPI',
  baseQuery,
  endpoints: (build) => ({
    fetchAllArticles: build.query<IArticleArrayResponse, { page: number; limit: number; isAuth: boolean }>({
      query: (params) => ({
        url: '/articles',
        params: { limit: params.limit, offset: (params.page - 1) * params.limit },
      }),
    }),
    fetchArticle: build.query<IArticleResponse, { slug: string; isAuth: boolean }>({
      query: (params) => ({
        url: `/articles/${params.slug}`,
      }),
    }),
    createArticle: build.mutation<IArticleResponse, IArticle>({
      query: (params) => ({
        url: '/articles',
        method: 'POST',
        body: {
          article: params,
        },
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
        },
      }),
    }),
    deleteArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
      }),
    }),
    favoriteArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
    }),
    unfavoriteArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
    }),
  }),
});

export default articlesApi;

export const {
  useFetchAllArticlesQuery,
  useFetchArticleQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} = articlesApi;
