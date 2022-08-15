import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

import ArticleForm, { ArticleFormData } from '../../components/ArticleForm';
import { useCreateArticleMutation } from '../../services/ArticlesService';
import { IArticle } from '../../types/Article';
import Notification from '../../components/Notification';

const CreateArticlePage = () => {
  const navigate = useNavigate();

  const [createArticle, { data: createArticleData, error: createArticleError }] = useCreateArticleMutation();

  useEffect(() => {
    if (createArticleData) {
      navigate('/');
    }
  }, [createArticleData, navigate]);

  useEffect(() => {
    if (createArticleError) {
      message.error('Не удалось создать статью');
    }
  }, [createArticleError]);

  const onSubmit = (data: ArticleFormData) => {
    const { title, description, body, tags } = data;
    const tagList = tags.map((tag) => tag.value);
    createArticle({ title, description, body, tagList } as IArticle);
  };

  return (
    <section className="big-centered-content">
      <ArticleForm title="Create new article" onSubmit={onSubmit} />
    </section>
  );
};

export default CreateArticlePage;
