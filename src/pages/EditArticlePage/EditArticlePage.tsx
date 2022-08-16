import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

import ArticleForm, { ArticleFormData } from '../../components/ArticleForm';
import { useEditArticleMutation, useFetchArticleQuery } from '../../services/ArticlesService';
import { IArticle } from '../../types/Article';
import { useAuth } from '../../hooks/useAuth';

const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isAuth = useAuth();
  const { data: fetchArticleData, isError: fetchArticleIsError } = useFetchArticleQuery(
    {
      slug: slug || '',
      isAuth,
    },
    { refetchOnMountOrArgChange: true }
  );
  const [editArticle, { data: editArticleData, error: editArticleError }] = useEditArticleMutation();

  useEffect(() => {
    if (editArticleData?.article) {
      navigate(`/articles/${slug}`);
    }
  }, [editArticleData]);

  useEffect(() => {
    if (fetchArticleIsError) {
      message.error('Не удалось загрузить данные о статье');
    }
  }, [fetchArticleIsError]);

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
    title: fetchArticleData?.article?.title || '',
    description: fetchArticleData?.article?.description || '',
    body: fetchArticleData?.article?.body || '',
    tags: fetchArticleData?.article?.tagList.map((tag) => ({ value: tag })) || [],
  };

  return (
    <section className="big-centered-content">
      <ArticleForm title="Edit article" onSubmit={onSubmit} data={formData} />
    </section>
  );
};

export default EditArticlePage;
