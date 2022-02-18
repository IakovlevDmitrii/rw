import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import PersonDetails from "../person-details";

import favoriteTrueImage from "../article/preview/images/favorite-true.png";
import favoriteFalseImage from "../article/preview/images/favorite-false.png";
import styles from "./ArticlePreview.module.scss";

function ArticlePreview({ content, isLoggedIn, onFavoriteArticle }) {
  const {
    author,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  } = content;

  const favoriteButton = isLoggedIn ? (
    <button
      className={styles.favoriteButton}
      onClick={() => onFavoriteArticle(slug)}
      type="button"
    >
      <img
        src={favorited ? favoriteTrueImage : favoriteFalseImage}
        alt="like"
      />
    </button>
    ) : (
    <img
      src={favorited ? favoriteTrueImage : favoriteFalseImage}
      alt="like"
    />
  );

  const getTags = () => (
    tagList.map((tag, index) => {
      const key = `${slug}${index}`

      return (
        <div className={styles.tag} key={key}>
          {tag}
        </div>
      );
    })
  );

  return (
    <article className={styles.content}>
      <div className={styles.article}>
        <div className={styles.info}>
          <div className={styles.title}>
            <Link to={`/articles/${slug}`}>
              <h2>{title}</h2>
            </Link>

            <div className={styles.favorites}>
              {favoriteButton}
              <span className={styles.favoritesCount}>{favoritesCount}</span>
            </div>
          </div>
          <div className={styles.tags}>{getTags()}</div>
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
          alt="user's avatar"
        />
      </div>
    </article>
  );
}

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
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onFavoriteArticle: PropTypes.func.isRequired
};

export default ArticlePreview;
