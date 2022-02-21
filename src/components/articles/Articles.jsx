import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, useRouteMatch} from "react-router-dom";
import { Pagination } from "antd";
import PropTypes from "prop-types";

// components
import Article from "../article";
import Spinner from "../spinner";
import ErrorIndicator from "../errors/error-indicator";

import ArticlePage from "../pages/article-page";

import realWorldApiService from "../../service";

import "antd/dist/antd.css";
import "./pagination.css";
import styles from "./Articles.module.scss";

function Articles({ token, isLoggedIn}) {
  const { path } = useRouteMatch();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articleList, setArticleList] = useState([]);

  // каждый раз при изменении номера страницы будем загружать список статей
  const loadArticleList = useCallback(() => {
    setIsLoading(true);

    realWorldApiService.articles
      .getList(page)
      .then(({ articles, articlesCount }) => {
        setArticleList(articles);
        setCount(articlesCount);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  useEffect(() => loadArticleList(), [loadArticleList]);
  useEffect( () => () => {
    setArticleList([]);
  }, [] );

  // при нажатии на лайк
  const onFavoriteArticle = (slug) => {

    // в списке статей найдем ту, которой нужно поставить или убрать лайк
    const index = articleList.findIndex(
      (article) => article.slug === slug
    );
    const searchedArticle = articleList[index];

    // узнаем, отмечена ли статья лайком
    const { favorited } = searchedArticle;

    // имя запроса зависит от значения favorited
    const getRequestName = () => (favorited ? "unfavorite" : "favorite");

    // функция для замены значения favorited в выбранной статье
    const toggleFavorited = () => {

      // создадим копию выбранной статьи и заменим в ней значение favorite на противоположное
      const newArticle = { ...searchedArticle, favorited: !favorited };

      // новый список статей содержит измененную статью
      const newArticleList = [
        ...articleList.slice(0, index),
        newArticle,
        ...articleList.slice(index + 1),
      ];

      // сохраним измененный список статей в state
      setArticleList(newArticleList);
    };

    // отправим запрос на изменение лайка
    realWorldApiService.articles[getRequestName()](token, slug)
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

  if (isLoading) {
    return <Spinner />;
  }

  if (hasError) {
    return <ErrorIndicator />;
  }

  const listToShow = articleList.map((article) => (
    <Article
      isPreview
      content={article}
      token={token}
      isLoggedIn={isLoggedIn}
      editable={false}
      onFavoriteArticle={onFavoriteArticle}
      key={article.slug}
    />
  ));

  return(
    <Switch>

      <Route path={`${path}/:slug`}>
        <ArticlePage />
      </Route>

      <Route path={path}>
        <section>
          <div className={styles.container}>
            <div className={styles.content}>
              {listToShow}
              <div className={styles.pagination}>
                <Pagination
                  current={page}
                  onChange={(pageNumber) => setPage(pageNumber)}
                  total={count}
                  hideOnSinglePage
                  pageSize="5"
                  size="small"
                  showSizeChanger={false}
                />
              </div>
            </div>
          </div>
        </section>
      </Route>

    </Switch>
  )
}

Articles.propTypes = {
  token: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
}

Articles.defaultProps = {
  token: "",
};

export default Articles;
