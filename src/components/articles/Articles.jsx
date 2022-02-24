import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Pagination } from "antd";
import PropTypes from "prop-types";

import ArticlePreview from "../article-preview";
import ArticlePage from "../pages/article-page-n";
import ErrorIndicator from "../errors/error-indicator";

import realWorldApiService from "../../service";
import actionCreators from "../../store/action-creators";

import "antd/dist/antd.css";
import "./pagination.css";
import styles from "./Articles.module.scss";

function Articles({ token, articleList, isLoggedIn, dispatchLoading, dispatchArticles }) {
  const { path } = useRouteMatch();

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [hasError, setHasError] = useState(false);

  // каждый раз при монтировании компонента
  // или изменении номера страницы
  // будем загружать список статей
  const loadArticleList = useCallback(() => {
    dispatchLoading(true);

    realWorldApiService.articles
      .getList(page)
      .then(({ articles, articlesCount }) => {
        setCount(articlesCount);
        dispatchArticles(articles);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        dispatchLoading(false);
      });
  }, [page, dispatchLoading, dispatchArticles]);

  useEffect(() => loadArticleList(), [loadArticleList]);

  // при нажатии на лайк
  const onFavoriteArticle = (slug) => {
    // в списке статей найдем ту, которой нужно поставить или убрать лайк
    const index = articleList.findIndex((article) => article.slug === slug);
    const searchedArticle = articleList[index];
    // узнаем, отмечена ли статья лайком и количество лайков
    const { favorited, favoritesCount } = searchedArticle;

    // имя запроса зависит от значения favorited
    const getRequestName = () => (favorited ? "unfavorite" : "favorite");

    // функция для замены значения favorited в выбранной статье
    const toggleFavorited = () => {
      const newFavoritesCount = favorited
        ? favoritesCount - 1
        : favoritesCount + 1;
      // создадим копию выбранной статьи и заменим в ней значение
      // favorite на противоположное
      // увеличим или уменьшим количество лайков
      const newArticle = {
        ...searchedArticle,
        favorited: !favorited,
        favoritesCount: newFavoritesCount,
      };

      // новый список статей содержит измененную статью
      const newArticleList = [
        ...articleList.slice(0, index),
        newArticle,
        ...articleList.slice(index + 1),
      ];

      // сохраним измененный список статей
      dispatchArticles(newArticleList);
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

  const listToShow = articleList.map((article) => (
    <ArticlePreview
      isLoggedIn={isLoggedIn}
      content={article}
      onFavoriteArticle={onFavoriteArticle}
      key={article.slug}
    />
  ));

  if (hasError) {
    return <ErrorIndicator />;
  }

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

Articles.propTypes = {
  articleList: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  token: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  dispatchLoading: PropTypes.func.isRequired,
  dispatchArticles: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  token: "",
  articleList: [
    {
    author: {
      image: "",
      username: "",
    },
    body: "",
    createdAt: "",
    description: "",
    favorited:false,
    favoritesCount: 0,
    slug: "",
    tagList: [''],
    title: "",
  }
  ]
};

const mapStateToProps = ({ articlesData }) => ({
  articleList: articlesData.articles
});
const mapDispatchToProps = {
  dispatchLoading: actionCreators.loading,
  dispatchArticles: actionCreators.articlesData.setArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
