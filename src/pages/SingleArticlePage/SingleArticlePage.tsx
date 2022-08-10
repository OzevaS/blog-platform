import { Spin, Alert } from 'antd';
import { useParams } from 'react-router-dom';

import Article from '../../components/Article';
import { articlesApi } from '../../services/ArticlesService';

const SingleArticlePage = () => {
  const { slug } = useParams();

  if (!slug) return null;

  const { data, isLoading, isError } = articlesApi.useFetchArticleQuery(slug);

  const hasData = !isLoading && !isError && data && data.article;

  return (
    <div className="centered-content">
      {isLoading && <Spin size="large" />}
      {isError && <Alert message="Error" type="error" description="Не удалось загрузить статью" />}
      {hasData && <Article article={data.article} isFull />}
    </div>
  );
};

export default SingleArticlePage;
