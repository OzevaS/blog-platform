import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ArticleForm, { ArticleFormData } from '../../components/ArticleForm';
import { articlesApi } from '../../services/ArticlesService';
import { IArticle } from '../../types/Article';
import Notification from '../../components/Notification';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const [createArticle, { data: createArticleData, error: createArticleError }] =
    articlesApi.useCreateArticleMutation();

  useEffect(() => {
    if (createArticleData) {
      navigate('/');
    }
  }, [createArticleData, navigate]);

  const onSubmit = (data: ArticleFormData) => {
    const { title, description, body, tags } = data;
    const tagList = tags.map((tag) => tag.value);
    createArticle({ title, description, body, tagList } as IArticle);
  };

  return (
    <section style={{position: 'relative'}}>
      <ArticleForm title="Create new article" onSubmit={onSubmit} />
      {createArticleError && <Notification title="Ошибка" error message="Не удалось создать статью" />}
    </section>
  );
};

export default CreateArticlePage;
