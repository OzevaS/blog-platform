/* eslint-disable react/jsx-no-undef */
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Spin, Alert, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import Article from '../../components/Article';
import { useAppSelector } from '../../hooks/redux';
import {
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useFetchArticleQuery,
  useUnfavoriteArticleMutation,
} from '../../services/ArticlesService';
import Notification from '../../components/Notification';
import { IArticle } from '../../types/Article';
import { useAuth } from '../../hooks/useAuth';

const SingleArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const [articleData, setArticleData] = useState<IArticle | null>(null);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const notificationStyle: CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      top: '120px',
      right: '19px',
    }),
    []
  );

  const {
    data: fetchArticleData,
    isLoading: fetchArticleDataIsLoading,
    isError: fetchArticleIsError,
  } = useFetchArticleQuery(
    {
      slug: slug || '',
      isAuth,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [deleteArticle, { isError: deleteArticleIsError, isSuccess: deleteArticleIsSuccess }] =
    useDeleteArticleMutation();
  const [favoriteArticle, { isError: favoriteIsError }] = useFavoriteArticleMutation();
  const [unFavoriteArticle, { isError: unFavoriteIsError }] = useUnfavoriteArticleMutation();

  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (deleteArticleIsSuccess) {
      navigate('/');
    }
  }, [deleteArticleIsSuccess]);

  useEffect(() => {
    if (fetchArticleData) {
      setArticleData(fetchArticleData.article);
    }
  }, [fetchArticleData]);

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

  useEffect(() => {
    if (deleteArticleIsError) {
      message.error('Не удалось удалить статью');
    }
  }, [deleteArticleIsError]);

  const isEdit = fetchArticleData?.article?.author.username === user?.username;

  const onEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const onClickFavorite = (slug: string) => {
    if (!isAuth) return;
    const article = articleData;
    const favoriteAction = article?.favorited ? unFavoriteArticle : favoriteArticle;
    favoriteAction(slug).then((response) => {
      if ('data' in response && article) {
        const newArticle = {
          ...article,
          favorited: !article.favorited,
          favoritesCount: article.favoritesCount + (article.favorited ? -1 : 1),
        };
        setArticleData(newArticle as IArticle);
      }
    });
  };

  const onDelete = (e: any) => {
    setNotificationVisible(true);
  };

  const onConfirm = () => {
    if (slug) {
      deleteArticle(slug);
    }
  };

  const onCancel = () => {
    setNotificationVisible(false);
  };

  return (
    <div className="big-centered-content">
      {fetchArticleDataIsLoading && <Spin size="large" />}
      {fetchArticleIsError && <Alert message="Error" type="error" description="Не удалось загрузить статью" />}
      {articleData && !fetchArticleIsError && (
        <Article
          article={articleData}
          isFull
          isEdit={isEdit}
          onDelete={onDelete}
          onEdit={onEdit}
          onClickFavorite={onClickFavorite}
        />
      )}
      {notificationVisible && (
        <Notification
          message="Are you sure to delete this article?"
          style={notificationStyle}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
};

export default SingleArticlePage;
