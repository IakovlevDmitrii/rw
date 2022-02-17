import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';

import Preview from "./preview";
import Author from "./author";
import Body from './body';

import styles from "./Article.module.scss";

const Article = ({ content, editable, onFavoriteArticle, onDeleteArticle }) => {
   const {
      author, body, createdAt, description, favorited, favoritesCount, tagList, title
   } = content;

    const { url } = useRouteMatch();

   const [ isPopUpOpen, setIsPopUpOpen ] = useState(false);

    return (
      <article className={styles.content}>

         <Preview
             title={title}
             onFavoriteArticle={onFavoriteArticle}
             favorited={favorited}
             favoritesCount={favoritesCount}
             tagList={tagList}
             description={description} />

         <Body content={body} />

         <Author
            name={author.username}
            date={createdAt}
            avatarSrc={author.image}
            editable={editable}
            onDeleteClick={() => setIsPopUpOpen(true)}
            articleUrl={url}
            isPopUpOpen={isPopUpOpen}
            onNoClick={() => setIsPopUpOpen(false)}
            onYesClick={() => onDeleteArticle()} />
      </article>
   )
};

Article.propTypes = {
    content: PropTypes.shape({
    author: PropTypes.shape({
     image: PropTypes.string.isRequired,
     username: PropTypes.string.isRequired,
    }).isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    favorited: PropTypes.bool.isRequired,
    favoritesCount: PropTypes.number.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    }).isRequired,
    editable: PropTypes.bool.isRequired,
    onDeleteArticle: PropTypes.func.isRequired,
    onFavoriteArticle: PropTypes.func.isRequired,
};

export default Article;
