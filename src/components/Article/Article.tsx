/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-var-requires */
import { format } from 'date-fns';
import React, { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { IArticle } from '../../types/Article';

import classNames from './Article.module.scss';

interface ArticleProps {
  article: IArticle;
  isFull?: boolean;
  isEdit?: boolean;
  onEdit?: () => void;
  onDelete?: (e: any) => void;
}

const Article: FC<ArticleProps> = React.memo(
  ({ article, isFull = false, isEdit = false, onEdit = () => {}, onDelete = () => {} }) => {
    const navigate = useNavigate();

    const tagList = article.tagList.map((tag: string) => (
      <span key={tag} className={classNames['tag-item']}>
        {tag}
      </span>
    ));

    const styleLike = article.favorited
      ? { backgroundImage: 'url(/static/like-active.svg)' }
      : { backgroundImage: 'url(/static/like.svg)' };

    const date = format(new Date(article.createdAt), 'MMMM dd, yyyy');

    const classNameArticle = isFull ? `${classNames['article--full']} ${classNames.article}` : classNames.article;

    const title = isFull ? (
      <h2 className={classNames.title}>{article.title}</h2>
    ) : (
      <Link to={`/articles/${article.slug}`}>
        <h2 className={classNames.title}>{article.title}</h2>
      </Link>
    );

    const editButtons = isEdit ? (
      <div className={classNames['edit-buttons']}>
        <button className={classNames['edit-button']} type="button" onClick={() => onEdit()}>
          Edit
        </button>
        <button className={classNames['delete-button']} type="button" onClick={(e) => onDelete(e)}>
          Delete
        </button>
      </div>
    ) : null;

    const onClickLike = () => {};

    return (
      <div className={classNameArticle}>
        <div className={classNames.header}>
          <div className={classNames['header-left']}>
            <div className={classNames['title-likes']}>
              {title}
              <div className={classNames.like}>
                <button onClick={onClickLike} className={classNames['like-button']} type="button" style={styleLike} />
                <span className={classNames['likes-count']}>{article.favoritesCount}</span>
              </div>
            </div>
            <div className={classNames['tag-list']}>{tagList}</div>
          </div>
          <div className={classNames.author}>
            <div className={classNames['authorname-date']}>
              <span className={classNames.authorname}>{article.author.username}</span>
              <span className={classNames.date}>{date}</span>
            </div>
            <img className={classNames['author-image']} src={article.author.image} alt={article.author.username} />
          </div>
        </div>
        <div className={classNames.wrapper}>
          <p className={classNames.description}>{article.description}</p>
          {editButtons}
        </div>
        <ReactMarkdown className={classNames.body} children={article.body} />
      </div>
    );
  }
);

export default Article;
