import React, { useState } from "react";
import { useRouteMatch , Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Preview from "./preview";
import Author from "./author";
import Body from "./body";

import realWorldApiService from "../../service";

import styles from "./Article.module.scss";

function Article({ content, token, isLoggedIn, editable, onFavoriteArticle }) {
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
  const [isArticleDeleted, setIsArticleDeleted] = useState(false);

  const onDeleteArticle = () => {
    realWorldApiService.articles
      .delete(token, slug)
      .then((res) => {
        const serverErrors = res.errors;

        if (res === "ok") {
          setIsArticleDeleted(true);
        }
        if (serverErrors) {
          throw new Error();
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return (
    <Route>
      {isArticleDeleted ? (
        <Redirect to="/articles" />
      ) : (
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
            onYesClick={() => onDeleteArticle()}
          />
        </article>
      )}
    </Route>
  );
}

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
    slug: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  token: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  editable: PropTypes.bool.isRequired,
  onFavoriteArticle: PropTypes.func.isRequired,
};

Article.defaultProps = {
  token: "",
};

export default Article;
