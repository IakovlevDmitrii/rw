import React, { useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';

import Body from './body';
import Author from "./author";

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import styles from "./Article.module.scss";

const Article = ({ content, editable, onFavoriteArticle, onDeleteArticle }) => {
   const {
      author, body, createdAt, description, favorited, favoritesCount, tagList, title
   } = content;

   const { url } = useRouteMatch();

   const [ isPopUpOpen, setIsPopUpOpen ] = useState(false);

   const tags = tagList.map((tag) => (
      <div className={styles.tag} key={tag}>
         {tag}
      </div>
   ));

   return (
      <article className={styles.content}>

         <div className={styles.article}>
            <div className={styles.info}>
               <div className={styles.title}>
                  <h2>{title}</h2>
                  <div className={styles.favorites}>
                     <button
                        className={styles.favoriteButton}
                        onClick={() => {onFavoriteArticle()}}
                        type='button'>
                        <img
                           src={favorited ? favoriteTrueImage : favoriteFalseImage}
                           alt='like' />
                     </button>
                     <span className={styles.favoritesCount}>
                        {favoritesCount}
                     </span>
                  </div>
               </div>
               <div className={styles.tags}>
                  {tags}
               </div>
            </div>
            <div className={styles.description}>
               <p>{description}</p>
            </div>
         </div>

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
   onFavoriteArticle: PropTypes.func.isRequired,
   onDeleteArticle: PropTypes.func.isRequired
};

export default Article;
