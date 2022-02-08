import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import RealWorldApiService from '../../../service';

import Spinner from "../../spinner";
import ArticleEditor from '../../article-editor';

const EditArticlePage = ({ token, slug, contentToChange }) => {
   const { path } = useRouteMatch();

   const [ newSlug, setNewSlug ] = useState('');
   const [ hasErrors, setHasErrors ] = useState({});
   const [ isLoading, setIsLoading ] = useState(false);
   const [ newArticleContent, setNewArticleContent ] = useState('');

   useEffect(() => (
      () => {
         setIsLoading(false);
         setNewArticleContent('');
      }
   ), []);

   const onSubmit = ( detailsToChange ) => {
      setIsLoading(true);

      RealWorldApiService
         .articles
         .edit(token, slug, detailsToChange)
         .then( (res) => {
            const articleDetails = res.article;
            const serverErrors = res.errors;

            if(articleDetails) {
               setNewSlug(articleDetails.slug);
            }

            if(serverErrors) {
               const { tagList, ...rest } = detailsToChange;
               const newArticle = {...rest};
               newArticle.tagList = [];

               tagList.forEach((tag) => {
                  (newArticle.tagList).push({value: tag})
               });

               setNewArticleContent(newArticle);
               setHasErrors(serverErrors);
            }
         })
         .catch( (err) => {
            throw new Error(err.message);
         })
         .finally(() => {
            setIsLoading(false);
         })
   };

   if(isLoading) {
      return <Spinner />
   }

   return (
      <Route path={path}>
         {newSlug ?
            <Redirect to={`/articles/${newSlug}`} />
            :
            <ArticleEditor
               title='Edit article'
               onFormSubmit={onSubmit}
               defaultValues={newArticleContent || contentToChange}
               hasErrors={hasErrors}
            />
         }
      </Route>
   )
};

EditArticlePage.propTypes = {
   token: PropTypes.string.isRequired,
   slug: PropTypes.string.isRequired,
   contentToChange: PropTypes.shape({
      body: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      tagList: PropTypes.arrayOf(
         PropTypes.objectOf(
            PropTypes.string.isRequired
         ).isRequired
      ).isRequired,
   }).isRequired
};

const mapStateToProps = ({ authentication }) => ({
   token: authentication.user.token,
});

export default connect(
   mapStateToProps
)(EditArticlePage);
