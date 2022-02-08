import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import ArticlePage from '../article-page';
import ArticleList from '../../article-list';

const HomePage = () => {
   const  { path } = useRouteMatch();

   return (
      <Switch>
         <Route path={`${path}/:slug`}>
            <ArticlePage />
         </Route>
         <Route path={path}>
            <ArticleList />
         </Route>
      </Switch>
   )
};

export default HomePage;
