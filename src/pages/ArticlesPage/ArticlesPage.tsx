import { Alert, Pagination } from 'antd';

import ArticleList from '../../components/ArticlesList';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { articlesApi } from '../../services/ArticlesService';
import { articlesSlice } from '../../store/reducers/ArticlesSlice';

const ArticlesPage = () => {
  const { page, limit } = useAppSelector((state) => state.articlesReducer.articles);
  const dispatch = useAppDispatch();
  const { setPage } = articlesSlice.actions;
  const { data, isLoading, isError } = articlesApi.useFetchAllArticlesQuery(
    {
      page,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const hasData = !isLoading && !isError && data;

  return (
    <section className="centered-content">
      {isLoading && <Loader />}
      {isError && <Alert message="Error" icon type="error" description="Не удалось загрузить статьи" />}
      {hasData && !isError && (
        <>
          <ArticleList articles={data.articles} />
          <Pagination
            style={{ margin: '0px auto', width: 'max-content' }}
            current={page}
            total={hasData ? data.articlesCount : 0}
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
