import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Pagination } from 'antd';
import PropTypes from "prop-types";

import ArticlePreview from '../article-preview';
import Spinner from "../spinner";
import ErrorIndicator from "../errors/error-indicator";
import ArticlePage from "../pages/article-page";

import realWorldApiService from '../../service';

import 'antd/dist/antd.css';
import './pagination.css';
import styles from './ArticleList.module.scss';

const ArticleList = ({ token } ) => {
    const { path } = useRouteMatch();

    const [ page, setPage ] = useState(1);
    const [ count, setCount ] = useState(0);
    const [ hasError, setHasError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ articleList, setArticleList ] = useState([]);

    const loadArticleList = useCallback( () => {
            setIsLoading(true);

            realWorldApiService
                .articles
                .getPreviews(page)
                .then( ({ articles, articlesCount }) => {
                    setArticleList(articles);
                    setCount(articlesCount);
                })
                .catch( () => {
                    setHasError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                })
        },
        [ page ]
    );

    useEffect(
        () => loadArticleList(),
        [loadArticleList]
    );

    const onFavoriteArticle = ( slug ) => {
        // в списке статей найдем ту, которой нужно поставить или убрать лайк
        const res = articleList.find( article => (slug === article.slug));

        // узнаем, отмечена ли статья лайком
        const { favorited } = res;

        // если статья не отмечена лайком
        if(!favorited) {
            // отправим запрос поставить лайк
            realWorldApiService
               .favoriteArticle(token, slug)
               .then((res) => {
                   // если запрос прошел успешно
                   if(res) {
                       // в списке статей, который хранится в state найдем статью, которой поставлен лайк
                       const articleIndex = articleList.findIndex((article) => article.slug === slug);

                       const oldArticle = articleList[articleIndex];

                       // заменим в ней значение favorite на true
                       const newArticle = { ...oldArticle, favorited: true };

                       const newArticleList = [...articleList.slice(0, articleIndex), newArticle, ...articleList.slice(articleIndex + 1)];

                       // сохраним измененный список статей в state
                       setArticleList(newArticleList)
                   } else {
                       // если запрос не прошел
                       setHasError(true);
                   }
               })
        }
        // const { favorited } = article;
        // setIsLoading(true);
        //
        // if(favorited){
        //     realWorldApiService
        //        .articles
        //        .unfavorite(token, slug)
        //        .then((res) => {
        //            const articleDetails = res.article;
        //            const serverErrors = res.errors;
        //
        //            if(articleDetails){
        //                setArticle(articleDetails)
        //            }
        //            if(serverErrors){
        //                setHasError(true);
        //            }
        //        })
        //        .catch(() => {
        //            setHasError(true);
        //        })
        //        .finally(() => {
        //            setIsLoading(false);
        //        })
        // } else {
        //     realWorldApiService
        //        .articles
        //        .favorite(token, slug)
        //        .then((res) => {
        //            const articleDetails = res.article;
        //            const serverErrors = res.errors;
        //
        //            if(articleDetails){
        //                setArticle(articleDetails)
        //            }
        //            if(serverErrors){
        //                setHasError(true);
        //            }
        //        })
        //        .catch(() => {
        //            setHasError(true);
        //        })
        //        .finally(() => {
        //            setIsLoading(false);
        //        })
        // }
    };

    if(isLoading) {
        return <Spinner />
    }

    if(hasError) {
        return <ErrorIndicator />
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
    )
};

ArticleList.propTypes = {
    token: PropTypes.string
};

ArticleList.defaultProps = {
   token: ''
};

export default ArticleList;