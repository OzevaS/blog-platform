/* eslint-disable react/jsx-no-undef */
import { CSSProperties, useState } from 'react';
import { Spin, Alert } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

import Article from '../../components/Article';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { articlesApi } from '../../services/ArticlesService';
import Notification from '../../components/Notification';
import { deleteArticle } from '../../store/asyncActionCreators/ArticleActions';

const SingleArticlePage = () => {
  const { slug } = useParams();
  const [notification, setNotification] = useState<{ visible: boolean; style: CSSProperties }>({
    visible: false,
    style: {},
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, isLoading, isError } = articlesApi.useFetchArticleQuery(slug || '', { refetchOnMountOrArgChange: true });
  const { user } = useAppSelector((state) => state.userReducer);

  const isEdit = data?.article?.author.username === user?.username;

  const onEdit = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const onDelete = (e: any) => {
    const button = e.target;
    const { x, y, height, width } = button.getBoundingClientRect();
    const offsetY = 10;
    setNotification({
      visible: true,
      style: {
        position: 'absolute',
        top: `${y + height + offsetY}px`,
        right: `${45}px`,
      },
    });
  };

  const onConfirm = () => {
    if (slug) {
      dispatch(deleteArticle(slug));
      //navigate('/');
    }
  };

  const onCancel = () => {
    setNotification({
      visible: false,
      style: {},
    });
  };

  return (
    <div className="centered-content">
      {isLoading && <Spin size="large" />}
      {isError && <Alert message="Error" type="error" description="Не удалось загрузить статью" />}
      {data?.article && <Article article={data.article} isFull isEdit={isEdit} onDelete={onDelete} onEdit={onEdit} />}
      {notification.visible && (
        <Notification
          message="Are you sure to delete this article?"
          style={notification.style}
          onCancel={onCancel}
          onConfirm={onConfirm}
        />
      )}
    </div>
  );
};

export default SingleArticlePage;
