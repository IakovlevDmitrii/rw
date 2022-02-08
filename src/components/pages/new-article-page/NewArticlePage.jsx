import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import RealWorldApiService from '../../../service';

import Spinner from "../../spinner";
import ArticleEditor from '../../article-editor';

const NewArticlePage = ({ token }) => {
   const [ slug, setSlug ] = useState('');
   const [ hasErrors, setHasErrors ] = useState({});
   const [ isLoading, setIsLoading ] = useState(false);

   const getInitialValues = () => ({
      title: '',
      description: '',
      body: '',
      tagList: [
         {value: ''}
      ]
   });

   const initialValues = useMemo(
      () => getInitialValues(),
      []
   );

   const [ defaultValues, setDefaultValues ] = useState(initialValues);

   useEffect(() => (
      () => {
         setIsLoading(false);
         setDefaultValues(initialValues);
         setSlug('');
      }
   ), [initialValues]);

   const onSubmit = ( newArticleContent ) => {
      setIsLoading(true);

      RealWorldApiService
         .articles
         .create(token, newArticleContent)
         .then( (res) => {
            const articleDetails = res.article;
            const serverErrors = res.errors;

            if(articleDetails) {
               setSlug(articleDetails.slug);
            }

            if(serverErrors) {
               let newDefaultValues = {};

               // tagList в newArticleData это массив строк вида ['a', 'b']
               // а в defaultValues надо сохранить tagList в виде [ {value: 'a'}, {value: 'b'} ]
               if(newArticleContent.tagList){
                  const { tagList, ...rest } = newArticleContent;
                  newDefaultValues = {...rest};

                  newDefaultValues.tagList = [];
                  tagList.forEach((tag) => {
                     (newDefaultValues.tagList).push({value: tag})
                  });
               } else {
                  newDefaultValues = {
                     ...newArticleContent,
                     tagList: [
                        {value: ''}
                     ]
                  };
               }

               setDefaultValues(newDefaultValues);
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
      <Route path='/new-article'>
         {slug ?
            <Redirect to={`/articles/${slug}`} />
            :
            <ArticleEditor
               title='Create new article'
               onFormSubmit={onSubmit}
               defaultValues={defaultValues}
               hasErrors={hasErrors}
            />
         }
      </Route>
   )
};

NewArticlePage.propTypes = {
   token: PropTypes.string.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
   token: authentication.user.token,
});

export default connect(
   mapStateToProps
)(NewArticlePage);

// {"article":{
// "slug":"React-A-900",
// "title":"React A",
// "description":"I am learning React",
// "body":"I like",
// "createdAt":"2022-01-25T22:18:02.824Z",
// "updatedAt":"2022-01-25T22:18:02.824Z",
// "tagList":["a","b"],"author":{"username":"aaaf","bio":null,"image":"https://api.realworld.io/images/smiley-cyrus.jpeg"},"favoritedBy":[],"_count":{"favoritedBy":0},
// "favoritesCount":0,
// "favorited":false}}

// article: {title: "React AAA", slug: "React-AAA-900", body: "I like this",…}
// author: {username: "aaaf", bio: null, image: "https://api.realworld.io/images/smiley-cyrus.jpeg",…}
// bio: null
// followedBy: []
// following: false
// image: "https://api.realworld.io/images/smiley-cyrus.jpeg"
// username: "aaaf"
// body: "I like this"
// createdAt: "2022-01-29T20:10:14.455Z"
// description: "I am learning React-Redux"
// favorited: false
// favoritesCount: 0
// slug: "React-AAA-900"
// tagList: ["a"]
// 0: "a"
// title: "React AAA"
// updatedAt: "2022-01-29T20:10:14.455Z"