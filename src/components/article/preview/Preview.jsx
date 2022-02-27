import React from "react";
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
          <h2>{title}</h2>
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
  slug: PropTypes.string,
  title: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  onFavoriteArticle: PropTypes.func.isRequired,
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  tagList: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
};

Preview.defaultProps = {
  slug: "",
  title: "",
  favorited: false,
  favoritesCount: 0,
  tagList: [""],
  description: "",
};
export default Preview;
