import React, { useState } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import PropTypes from 'prop-types';

import Body from './body';
import PersonDetails from "../person-details";

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import attention from './images/attention.svg';
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

   const popUp = (
      <div className={styles.popUp}>

         <div className={styles.popUpText}>
            <img src={attention} alt='attention' />
            <span>Are you sure to delete this article?</span>
         </div>

         <div className={styles.popUpButtons}>
            <button
               className={styles.popUpNo}
               onClick={() => setIsPopUpOpen(false)}
               type='button'>
               No
            </button>
            <button
               className={styles.popUpYes}
               onClick={() => onDeleteArticle()}
               type='button'>
               Yes
            </button>
         </div>
      </div>
   );

   const buttons = (
      <div className={styles.buttons}>
         <button
            className={styles.deleteArticleButton}
            onClick={() => setIsPopUpOpen(true)}
            type='button'>Delete</button>

         {isPopUpOpen && popUp}

         <Link to={`${url}/edit`}>
            <button
               className={styles.editArticleButton}
               type='button'>Edit</button>
         </Link>
      </div>
   );

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

         <div className={styles.author}>
            <PersonDetails
               name={author.username}
               date={createdAt}
               src={author.image}
               alt="user's avatar"
            />

            {editable && buttons}
         </div>
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
