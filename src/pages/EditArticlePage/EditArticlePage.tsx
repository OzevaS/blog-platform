import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ArticleForm, { ArticleFormData } from '../../components/ArticleForm';
import { articlesApi } from '../../services/ArticlesService';
import { IArticle } from '../../types/Article';
import Notification from '../../components/Notification';

const EditArticlePage = () => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: articleData,
    isLoading: articleIsLoading,
    isError: articleIsError,
  } = articlesApi.useFetchArticleQuery(slug || '', { refetchOnMountOrArgChange: true });
  const [editArticle, { data: editArticleData, error: editArticleError }] = articlesApi.useEditArticleMutation();

  useEffect(() => {
    if (editArticleData?.article) {
      navigate(`/articles/${slug}`);
    }
  }, [editArticleData]);

  const onSubmit = (data: ArticleFormData) => {
    const { title, description, body, tags } = data;
    const tagList = tags.map((tag) => tag.value);
    editArticle({ title, description, body, tagList, slug } as IArticle);
  };

  const formData: ArticleFormData = {
    title: articleData?.article?.title || '',
    description: articleData?.article?.description || '',
    body: articleData?.article?.body || '',
    tags: articleData?.article?.tagList.map((tag) => ({ value: tag })) || [],
  };

  return (
    <section style={{ position: 'relative' }}>
      <ArticleForm title="Edit article" onSubmit={onSubmit} data={formData} />
      {editArticleError && <Notification title="Ошибка" error message="Не удалось изменить статью" />}
    </section>
  );
};

export default EditArticlePage;
