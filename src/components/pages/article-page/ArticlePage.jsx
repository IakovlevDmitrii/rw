import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import realWorldApiService from "../../../service";
import actionCreators from "../../../store/action-creators";

import Article from "../../article";
import EditArticlePage from "../edit-article-page";
import ErrorIndicator from "../../errors/error-indicator";

import styles from "./ArticlePage.module.scss";

function ArticlePage({ username, token, isLoggedIn, dispatchLoading }) {
  const { slug } = useParams();
  const { path } = useRouteMatch();

  const [article, setArticle] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isArticleDeleted, setIsArticleDeleted] = useState(false);

  // каждый раз при монтировании компонента
  // будем загружать  статью
  const loadArticle = useCallback(() => {
    dispatchLoading(true);

    realWorldApiService.articles
      .getOne(slug)
      .then((articleContent) => {
        setArticle(articleContent);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        dispatchLoading(false);
      });
  }, [slug, setArticle, dispatchLoading]);

  useEffect(() => loadArticle(), [loadArticle]);

  // при нажатии на лайк
  const onFavoriteArticle = () => {
    // узнаем, отмечена ли статья лайком и количество лайков
    const { favorited, favoritesCount } = article;

    // имя запроса зависит от значения favorited
    const requestName = favorited ? "unfavorite" : "favorite";

    // функция для замены значения favorited и favoritesCount в статье
    const toggleFavorited = () => {
      const newFavoritesCount = favorited
        ? favoritesCount - 1
        : favoritesCount + 1;

      setArticle(() => ({
        ...article,
        favorited: !favorited,
        favoritesCount: newFavoritesCount,
      }));
    };

    // отправим запрос на изменение лайка
    realWorldApiService.articles[requestName](token, slug)
      .then((res) => {
        // если запрос прошел успешно
        if (res) {
          // заменим лайк в статье
          toggleFavorited();
        } else {
          // если запрос не прошел
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  };

  const onDeleteArticle = () => {
    realWorldApiService.articles
      .delete(token, slug)
      .then((res) => {
        if (res) {
          setIsArticleDeleted(true);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  };

  const { title, description, body } = article;
  const contentToChange = { title, description, body };

  if (article.tagList) {
    contentToChange.tagList = [];

    article.tagList.forEach((tag) => {
      contentToChange.tagList.push({ value: tag });
    });
  } else {
    contentToChange.tagList = [{ value: "" }];
  }

  if (hasError) {
    return <ErrorIndicator />;
  }

  if (article.slug) {
    return (
      <Switch>
        <Route path={`${path}/edit`}>
          <EditArticlePage slug={slug} contentToChange={contentToChange} />
        </Route>
        <Route path={path}>
          {isArticleDeleted ? (
            <Redirect to="/articles" />
          ) : (
            <section>
              <div className={styles.container}>
                <Article
                  content={article}
                  isLoggedIn={isLoggedIn}
                  editable={username === article.author.username}
                  onFavoriteArticle={onFavoriteArticle}
                  onDeleteArticle={onDeleteArticle}
                />
              </div>
            </section>
          )}
        </Route>
      </Switch>
    );
  }

  return null;
}

ArticlePage.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatchLoading: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  username: authentication.user.username,
  token: authentication.user.token,
  isLoggedIn: authentication.isLoggedIn,
});
const mapDispatchToProps = {
  dispatchLoading: actionCreators.loading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
