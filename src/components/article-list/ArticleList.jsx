import React, { useState, useEffect, useCallback } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Pagination } from "antd";
import PropTypes from "prop-types";

import ArticlePreview from "../article-preview";
import Spinner from "../spinner";
import ErrorIndicator from "../errors/error-indicator";
import ArticlePage from "../pages/article-page";

import realWorldApiService from "../../service";

import "antd/dist/antd.css";
import "./pagination.css";
import styles from "./ArticleList.module.scss";

function ArticleList({ token }) {
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

  const onFavoriteArticle = (slug) => {
    // в списке статей найдем ту, которой нужно поставить или убрать лайк
    const result = articleList.find((article) => slug === article.slug);

    // узнаем, отмечена ли статья лайком
    const { favorited } = result;

    // имя запроса зависит от значения favorited
    const getRequestName = () => (favorited ? "unfavorite" : "favorite");

    // функция для замены значения favorited в выбранной статье из списка ArticleList
    const toggleFavorited = () => {
      // найдем статью по значению slug
      const articleIndex = articleList.findIndex(
        (article) => article.slug === slug
      );
      const oldArticle = articleList[articleIndex];

      // заменим в ней значение favorite на противоположное
      const newArticle = { ...oldArticle, favorited: !favorited };

      // новый список статей содержит измененную статью
      const newArticleList = [
        ...articleList.slice(0, articleIndex),
        newArticle,
        ...articleList.slice(articleIndex + 1),
      ];

      // сохраним измененный список статей в state
      setArticleList(newArticleList);
    };

    // функция отправляет запрос на изменение лайка
    realWorldApiService.articles[getRequestName()](token, slug)
      .then((res) => {
        // если запрос прошел успешно
        if (res) {
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
    <ArticlePreview
      content={article}
      onFavoriteArticle={onFavoriteArticle}
      key={article.slug}
    />
  ));

  return (
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
  );
}

ArticleList.propTypes = {
  token: PropTypes.string,
};

ArticleList.defaultProps = {
  token: "",
};

export default ArticleList;
