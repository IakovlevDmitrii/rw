import React from "react";
import PropTypes from "prop-types";
import Preview from "./preview";
import styles from "./ArticlePreview.module.scss";
import PersonDetails from "../person-details";

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

  return (
    <article className={styles.content}>
      <Preview
        slug={slug}
        title={title}
        isLoggedIn={isLoggedIn}
        onFavoriteArticle={onFavoriteArticle}
        favorited={favorited}
        favoritesCount={favoritesCount}
        tagList={tagList}
        description={description}
      />
      <div className={styles.author}>
        <PersonDetails
          name={author.username}
          date={createdAt}
          src={author.image}
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
  onFavoriteArticle: PropTypes.func.isRequired,
};

export default ArticlePreview;
