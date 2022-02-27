import React, { useState } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import PropTypes from "prop-types";

import Preview from "./preview";
import PersonDetails from "../person-details";

import attention from "./images/attention.svg";
import styles from "./Article.module.scss";

function Article({
  content,
  isLoggedIn,
  editable,
  onFavoriteArticle,
  onDeleteArticle,
}) {
  const {
    author,
    body,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  } = content;

  const { url } = useRouteMatch();
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const popUp = (
    <div className={styles.popUp}>
      <div className={styles.popUpText}>
        <img src={attention} alt="attention" />
        <span>Are you sure to delete this article?</span>
      </div>

      <div className={styles.popUpButtons}>
        <button
          className={styles.popUpNo}
          onClick={() => setIsPopUpOpen(false)}
          type="button"
        >
          No
        </button>
        <button
          className={styles.popUpYes}
          onClick={() => onDeleteArticle()}
          type="button"
        >
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
        type="button"
      >
        Delete
      </button>

      {isPopUpOpen && popUp}

      <Link to={`${url}/edit`}>
        <button className={styles.editArticleButton} type="button">
          Edit
        </button>
      </Link>
    </div>
  );

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

      <div className={styles.body}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>

      <div className={styles.author}>
        <PersonDetails
          name={author.username}
          date={createdAt}
          src={author.image}
        />

        {editable && buttons}
      </div>
    </article>
  );
}

Article.propTypes = {
  content: PropTypes.shape({
    author: PropTypes.shape({
      image: PropTypes.string,
      username: PropTypes.string,
    }),
    body: PropTypes.string,
    createdAt: PropTypes.string,
    description: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    slug: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onFavoriteArticle: PropTypes.func.isRequired,
  onDeleteArticle: PropTypes.func.isRequired,
};

Article.defaultProps = {
  content: {
    author: {
      image: "",
      username: "",
    },
    body: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    tagList: [""],
    title: "",
  },
};

export default Article;
