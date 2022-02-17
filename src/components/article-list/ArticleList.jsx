import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Pagination } from 'antd';

import ArticlePreview from '../article-preview';
import Spinner from "../spinner";
import ErrorIndicator from "../errors/error-indicator";

import realWorldApiService from '../../service';

import 'antd/dist/antd.css';
import './pagination.css';
import styles from './ArticleList.module.scss';
import ArticlePage from "../pages/article-page";

const ArticleList = () => {
    const  { path } = useRouteMatch();

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

    if(isLoading) {
        return <Spinner />
    }

    if(hasError) {
        return <ErrorIndicator />
    }

    const listToShow = articleList.map((article) => (
        <ArticlePreview
            content={article}
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

export default ArticleList;