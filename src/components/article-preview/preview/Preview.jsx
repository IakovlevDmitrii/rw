import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import favoriteTrueImage from "./images/favorite-true.png";
import favoriteFalseImage from "./images/favorite-false.png";
import styles from "./Preview.module.scss";

function Preview({
  slug,
  title,
  isLoggedIn,
  onFavoriteArticle,
  favorited,
  favoritesCount,
  tagList,
  description,
}) {
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
    <img src={favorited ? favoriteTrueImage : favoriteFalseImage} alt="like" />
  );

  const getTags = () =>
    tagList.map((tag, index) => {
      const key = `${slug}${index}`;

      return (
        <div className={styles.tag} key={key}>
          {tag}
        </div>
      );
    });

  return (
    <div className={styles.article}>
      <div className={styles.info}>
        <div className={styles.title}>
          <Link to={`articles/${slug}`}>
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
  );
}

Preview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onFavoriteArticle: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
};

export default Preview;
