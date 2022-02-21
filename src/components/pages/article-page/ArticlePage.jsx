import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from "react-router-dom";
import PropTypes from "prop-types";

// api service
import realWorldApiService from "../../../service";

// components
import Article from "../../article";
import EditArticlePage from "../edit-article-page";
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from "./ArticlePage.module.scss";

function ArticlePage({ username, token, isLoggedIn }) {
  const { slug } = useParams();
  const { path } = useRouteMatch();

  const [article, setArticle] = useState({});
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // каждый раз, прежде чем отобразить статью будем ее получать с сервера
  const loadArticle = useCallback(() => {
    realWorldApiService.articles
      .getOne(slug)
      .then((articleContent) => {

        // полученную статью сохраним в article
        setArticle(articleContent);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, setArticle]);

  useEffect(() => loadArticle(), [loadArticle]);
  useEffect(() => () => setArticle({}), []);

  const onFavoriteArticle = () => {

    // узнаем, отмечена ли статья лайком
    const { favorited } = article;
    // setIsLoading(true);

    // имя запроса зависит от значения favorited
    const getRequestName = () => (favorited ? "unfavorite" : "favorite");

    // отправим запрос на изменение лайка
    realWorldApiService.articles[getRequestName()](token, slug)
      .then((res) => {
        // если запрос прошел успешно
        if (res) {

          // заменим лайк в статье
          setArticle({...article, favorited: !favorited})
        } else {
          // если запрос не прошел
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

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <ErrorIndicator />;
  }

  return (
    <Switch>
      <Route path={`${path}/edit`}>
        <EditArticlePage slug={slug} contentToChange={contentToChange} />
      </Route>

      <Route path={path}>
        <section className={styles.section}>
          <div className={styles.container}>
            <Article
              isPreview={false}
              content={article}
              token={token}
              isLoggedIn={isLoggedIn}
              editable={username === article.author.username}
              onFavoriteArticle={onFavoriteArticle}
            />
          </div>
        </section>
      </Route>
    </Switch>
  );
}

ArticlePage.propTypes = {
  username: PropTypes.string,
  token: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
};

ArticlePage.defaultProps = {
  username: "",
  token: ""
};

const mapStateToProps = ({ authentication }) => ({
  username: authentication.user.username,
  token: authentication.user.token,
  isLoggedIn: authentication.isLoggedIn
});

export default connect(mapStateToProps)(ArticlePage);
