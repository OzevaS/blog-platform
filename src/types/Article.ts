import { IUser } from './User';

export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  createdAt: string;
  author: {
    username: string;
    image: string;
  };
}

export interface IArticleArrayResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticle;
}
