import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PersonDetails from "../person-details";

import favoriteTrueImage from "../article/preview/images/favorite-true.png";
import favoriteFalseImage from "../article/preview/images/favorite-false.png";
import styles from './ArticlePreview.module.scss';

const ArticlePreview = ({ content }) => {
   const {
      author, createdAt, description, favorited, favoritesCount, slug, tagList, title
   } = content;

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
                  <Link to={`/articles/${slug}`}>
                     <h2>{title}</h2>
                  </Link>
                  <div className={styles.favorites}>
                     <img
                        src={favorited ? favoriteTrueImage : favoriteFalseImage}
                        alt='like' />
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

         <div className={styles.author}>
            <PersonDetails
               name={author.username}
               date={createdAt}
               src={author.image}
               alt="user's avatar" />
         </div>
      </article>
   )
};

ArticlePreview.propTypes = {
   content: PropTypes.shape({
      author: PropTypes.shape({
         image: PropTypes.string.isRequired,
         username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      favorited: PropTypes.bool.isRequired,
      favoritesCount: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
   }).isRequired
};

export default ArticlePreview;
