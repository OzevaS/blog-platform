import { Alert, Pagination, message } from 'antd';
import { useEffect, useState } from 'react';

import ArticleList from '../../components/ArticleList';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  useFavoriteArticleMutation,
  useFetchAllArticlesQuery,
  useUnfavoriteArticleMutation,
} from '../../services/ArticlesService';
import { articlesSlice } from '../../store/reducers/ArticlesSlice';
import { IArticle } from '../../types/Article';

const ArticlesPage = () => {
  const { page, limit } = useAppSelector((state) => state.articlesReducer.articles);
  const dispatch = useAppDispatch();
  const { setPage } = articlesSlice.actions;
  const {
    data: fetchAllArticlesData,
    isLoading: fetchAllArticlesIsLoading,
    isError: fetchAllArticlesIsError,
  } = useFetchAllArticlesQuery(
    {
      page,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [articlesData, setArticlesData] = useState<IArticle[] | null>(null);
  const [favoriteArticle, { isError: favoriteIsError }] = useFavoriteArticleMutation();
  const [unFavoriteArticle, { isError: unFavoriteIsError }] = useUnfavoriteArticleMutation();

  useEffect(() => {
    if (fetchAllArticlesData) {
      setArticlesData(fetchAllArticlesData.articles);
    }
  }, [fetchAllArticlesData]);

  useEffect(() => {
    if (favoriteIsError) {
      message.error('Не удалось добавить статью в избранное');
    }
  }, [favoriteIsError]);
  useEffect(() => {
    if (unFavoriteIsError) {
      message.error('Не удалось удалить статью из избранного');
    }
  }, [unFavoriteIsError]);

  const onClickFavorite = (slug: string) => {
    const article = articlesData?.find((article) => article.slug === slug);
    const favoriteAction = article?.favorited ? unFavoriteArticle : favoriteArticle;
    favoriteAction(slug).then((response) => {
      if ('data' in response) {
        const newArticlesData = articlesData?.map((article) => {
          if (article.slug === slug) {
            return {
              ...article,
              favorited: !article.favorited,
              favoritesCount: article.favoritesCount + (article.favorited ? -1 : 1),
            };
          }
          return article;
        });
        if (newArticlesData) setArticlesData(newArticlesData);
      }
    });
  };

  const hasData = !fetchAllArticlesIsLoading && !fetchAllArticlesIsError && articlesData && fetchAllArticlesData;

  return (
    <section className="big-centered-content">
      {fetchAllArticlesIsLoading && <Loader />}
      {fetchAllArticlesIsError && (
        <Alert message="Error" icon showIcon type="error" description="Не удалось загрузить статьи" />
      )}
      {hasData && (
        <>
          <ArticleList articles={articlesData} onClickFavorite={onClickFavorite} />
          <Pagination
            style={{ margin: '0px auto', width: 'max-content' }}
            current={page}
            total={hasData ? fetchAllArticlesData.articlesCount : 0}
            onChange={(page) => {
              dispatch(setPage(page));
            }}
          />
        </>
      )}
    </section>
  );
};

export default ArticlesPage;
