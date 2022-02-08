import React, { useState, useEffect, useCallback } from 'react';
import { connect } from "react-redux";
import { Switch, Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import realWorldApiService from '../../../service';

import Article from '../../article';
import EditArticlePage from '../edit-article-page';
import Spinner from "../../spinner";
import ErrorIndicator from "../../errors/error-indicator";

import styles from './ArticlePage.module.scss';

const ArticlePage = ({ username, token }) => {
   const { slug } = useParams();
   const { path } = useRouteMatch();

   const [ article, setArticle ] = useState({});
   const [ hasError, setHasError ] = useState(false);
   const [ isLoading, setIsLoading ] = useState(true);
   const [ isArticleDeleted, setIsArticleDeleted ] = useState(false);

   const loadArticle = useCallback(() => {

         realWorldApiService
            .articles
            .getArticle(slug)
            .then((articleContent) => {
               setArticle(articleContent);
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      },
      [slug, setArticle]
   );

   useEffect(
      () => loadArticle(),
      [loadArticle]
   );

   const onFavoriteArticle = () => {
      const { favorited } = article;
      setIsLoading(true);

      if(favorited){
         realWorldApiService
            .articles
            .unfavorite(token, slug)
            .then((res) => {
               const articleDetails = res.article;
               const serverErrors = res.errors;

               if(articleDetails){
                  setArticle(articleDetails)
               }
               if(serverErrors){
                  setHasError(true);
               }
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      } else {
         realWorldApiService
            .articles
            .favorite(token, slug)
            .then((res) => {
               const articleDetails = res.article;
               const serverErrors = res.errors;

               if(articleDetails){
                  setArticle(articleDetails)
               }
               if(serverErrors){
                  setHasError(true);
               }
            })
            .catch(() => {
               setHasError(true);
            })
            .finally(() => {
               setIsLoading(false);
            })
      }
   };

   const onDeleteArticle = () => {
      realWorldApiService
         .articles
         .delete(token, slug)
         .then((res) => {
            const serverErrors = res.errors;

            if(res === 'ok'){
               setIsArticleDeleted(true);
            }
            if(serverErrors){
               throw new Error();
            }
         })
         .catch(err => {
            throw new Error(err.message);
         })
   };

   const { title, description, body } = article;
   const contentToChange = { title, description, body };

   if(article.tagList){
      contentToChange.tagList = [];

      article.tagList.forEach((tag) => {
         (contentToChange.tagList).push({value: tag})
      });
   } else {
      contentToChange.tagList = [
         {value: ''}
      ];
   }

   if(isLoading) {
      return <Spinner />
   }

   if(hasError) {
      return <ErrorIndicator />
   }

   return (
      <Switch>
         <Route path={`${path}/edit`}>
            <EditArticlePage
               slug={slug}
               contentToChange={contentToChange}
            />
         </Route>
         <Route path={path}>
            {isArticleDeleted ? <Redirect to="/articles" /> :
            <section className={styles.section}>
               <div className={styles.container}>
                  <Article
                     content={article}
                     editable={username === article.author.username}
                     onFavoriteArticle={onFavoriteArticle}
                     onDeleteArticle={onDeleteArticle}
                  />
               </div>
            </section>
               }
         </Route>

      </Switch>
   )
};

ArticlePage.propTypes = {
   username: PropTypes.string.isRequired,
   token: PropTypes.string.isRequired
};

const mapStateToProps = ({ authentication }) => ({
   username: authentication.user.username,
   token: authentication.user.token
});

export default connect(
   mapStateToProps
)(ArticlePage);
