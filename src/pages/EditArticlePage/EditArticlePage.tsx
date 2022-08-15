import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

import ArticleForm, { ArticleFormData } from '../../components/ArticleForm';
import { useEditArticleMutation, useFetchArticleQuery } from '../../services/ArticlesService';
import { IArticle } from '../../types/Article';
import Notification from '../../components/Notification';

const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    data: articleData,
    isError: articleIsError,
  } = useFetchArticleQuery(slug || '', { refetchOnMountOrArgChange: true });
  const [editArticle, { data: editArticleData, error: editArticleError }] = useEditArticleMutation();

  useEffect(() => {
    if (editArticleData?.article) {
      navigate(`/articles/${slug}`);
    }
  }, [editArticleData]);

  useEffect(() => {
    if (editArticleError) {
      message.error('Не удалось отредактировать статью');
    }
  }, [editArticleError]);

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
    <section className="big-centered-content">
      <ArticleForm title="Edit article" onSubmit={onSubmit} data={formData} />
    </section>
  );
};

export default EditArticlePage;
