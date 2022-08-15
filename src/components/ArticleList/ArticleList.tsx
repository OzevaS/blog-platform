import { FC } from 'react';

import { IArticle } from '../../types/Article';
import Article from '../Article/Article';

import classNames from './ArticleList.module.scss';

interface ArticleListProps {
  articles: IArticle[];
  onClickFavorite?: (slug: string) => void;
}

const ArticleList: FC<ArticleListProps> = ({ articles, onClickFavorite = () => {} }) => {
  return (
    <div className={classNames['article-list']}>
      {articles.map((article) => (
        <Article key={article.slug} article={article} onClickFavorite={onClickFavorite}/>
      ))}
    </div>
  );
};

export default ArticleList;
