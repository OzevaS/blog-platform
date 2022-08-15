import { FC } from 'react';

import { IArticle } from '../../types/Article';
import Article from '../Article/Article';

import classNames from './ArticleList.module.scss';

interface ArticleListProps {
  articles: IArticle[];
}

const ArticleList: FC<ArticleListProps> = ({ articles }) => {
  return (
    <div className={classNames['article-list']}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
